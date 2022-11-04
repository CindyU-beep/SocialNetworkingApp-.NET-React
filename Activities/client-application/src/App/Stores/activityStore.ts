import { makeAutoObservable, runInAction } from "mobx";
import agent from "../API/agent";
import { Activity } from "../Models/activity";
import {v4 as uuid} from 'uuid';

export default class ActivityStore{
    activities: Activity[] = [];
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editing = false;
    loading = false; 
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this)
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b) => 
        Date.parse(a.date) - Date.parse(b.date));
    }



    loadActivities = async () => { //async await
        //getting list of activities, for ea activity split date and push activity into activity array 
        try{
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date=activity.date.split("T")[0];
                this.activityRegistry.set(activity.id,activity);
                //mutating state: mobX creates mutable obj we can modify directly
            })
            this.setLoadingInitial(false);
        } catch(error){
            console.log(error);
            this.setLoadingInitial(false);
            
        }
    }

    loadActivity = async(id: string) => {
        let activity = this.getActivity(id);
        if(activity){
            this.selectedActivity=activity;
        } else {
            this.loadingInitial=true;
            try{
                activity = await agent.Activities.details(id);
            } catch(error){
                console.log(error)
            }
        }
    }
    private getActivity(id: string){
        return this.activityRegistry.get(id)
    }

    private setActivity = (activity: Activity) =>{
        activity.date = 
    }

    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        //return activity based on id
        this.selectedActivity = this.activityRegistry.get(id); 
    }

    cancelSelectedActivity = () =>{
        this.selectedActivity = undefined;
    }

    formOpen = (id?: string) => {
        id? this.selectActivity(id) : this.cancelSelectedActivity(); 
        this.editing = true;
    }

    formClose = () => {
        this.editing = false;
    }

    createActivity = async(activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
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
                if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
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

