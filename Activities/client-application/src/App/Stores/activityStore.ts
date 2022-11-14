import { makeAutoObservable, runInAction } from "mobx";
import agent from "../API/agent";
import { Activity } from "../Models/activity";
import { format } from 'date-fns';

export default class ActivityStore{
    activities: Activity[] = [];
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editing = false;
    loading = false; 
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b) => 
        a.date!.getTime() - b.date!.getTime()); //.date!, in this case date cannot be null when being accessed 
    }

    get groupedActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity)=> {
                const date = format(activity.date!, 'dd MMM yyyy');
                activities[date] = activities[date] ? [...activities[date], activity]: [activity];
                return activities;
            },{} as {[key: string]: Activity[]}) //
        )
    }


    //method for loading list of activities
    loadActivities = async () => { //async await to return Promise
        //getting list of activities, for ea activity split date and push activity into activity array 
        this.loadingInitial=true;
        try{
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity)
                //mutating state: mobX creates mutable obj we can modify directly
            })
            this.setLoadingInitial(false);
        } catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    //method for loading individual activity
    loadActivity = async(id: string) => {
        let activity = this.getActivity(id); 
        if(activity){
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial=true;
            try{
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(()=>{
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            } catch(error){
                console.log(error)
                this.setLoadingInitial(false)
            }
        }
    }

    //helper method to check to see if activity is in registry 
    private getActivity(id: string){
        return this.activityRegistry.get(id)
    }
    //helper method for setting date and assigning activity to registry
    private setActivity = (activity: Activity) =>{
        activity.date= new Date(activity.date!);
        this.activityRegistry.set(activity.id,activity);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async(activity: Activity) => {
        this.loading = true;
        try{
            await agent.Activities.create(activity);
            runInAction(() => { //update state using actions
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editing = false;
                this.loading = false;

            })
        } catch (error){
            console.log(error);
            runInAction(() => { //update state using actions
                this.loading = false
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try{
            await agent.Activities.update(activity);
            runInAction (() => {
                this.activityRegistry.set(activity.id,activity)
                this.selectedActivity = activity;
                this.editing = false;
                this.loading = false;
            })

        } catch (error){
            console.log(error);
            runInAction(() => {
                this.loading = false; 
            })

        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try{
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            })

        } catch (error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}

