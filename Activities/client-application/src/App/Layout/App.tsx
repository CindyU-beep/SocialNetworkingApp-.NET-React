import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import "../Layout/index.css";
import ActivityDashboard from '../../AppFeatures/activities/dashboard/ActivityDashboard';
import { Activity } from '../Models/activity';
import {v4 as uuid} from 'uuid';
import agent from '../API/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const[activities, setActivities] = useState<Activity[]>([])
  const[selectedActivity, setSelectedActivity]=useState<Activity | undefined> (undefined);
  const[editing, setEditing] = useState(false);
  const[loading,setLoading] = useState(true);
  const[submitting,setSubmitting] = useState(false);

  useEffect(()=> { //
    agent.Activities.list().then(response => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date=activity.date.split("T")[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);

    })
  }, [] ) //ensures only runs once; gets activities once to prevent infinite loop

  function SelectedActivityHandler(id: string){
    setSelectedActivity(activities.find(x=>x.id ===id))
  }

  function CancelActivityHandler(){
    setSelectedActivity(undefined);
  }

  function FormOpenHandler(id?: string){
    id ? SelectedActivityHandler(id) : CancelActivityHandler();
    setEditing(true);
  }

  function FormCloseHandler(){
    setEditing(false);
  }

  function ActivityActionsHandler(activity: Activity){ //handler for adding or editing activities
    setSubmitting(true);

    if (activity.id){ //if existing activity
      agent.Activities.update(activity).then(()=> {
        setActivities([...activities.filter(x=>x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditing(false);
        setSubmitting(false);
      })
    } else { //new activity
      activity.id = uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditing(false);
        setSubmitting(false);
      })
    }
  }

  function DeleteActivityHandler(id: string){
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x=>x.id!== id)])
      setSubmitting(false);
    })
  }

  if (loading) return <LoadingComponent content='Loading. . .'/>
  
  return (
    <>
      <NavBar formOpen={FormOpenHandler}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={SelectedActivityHandler}
          cancelSelectedActivity={CancelActivityHandler}
          editing={editing}
          formOpen={FormOpenHandler}
          formClose={FormCloseHandler}
          activityActions={ActivityActionsHandler}
          deleteActivity={DeleteActivityHandler}
          submitting = {submitting}
        />
      </Container>
    </>
  );
}

export default App;
