import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import "../Layout/index.css";
import ActivityDashboard from '../../AppFeatures/activities/dashboard/ActivityDashboard';
import { Activity } from '../Models/activity';
import {v4 as uuid} from 'uuid';

function App() {
  const[activities, setActivities] = useState<Activity[]>([])
  const[selectedActivity, setSelectedActivity]=useState<Activity | undefined> (undefined);
  const[editing, setEditing] = useState(false);
  

  useEffect(()=> { //
    axios.get('http://localhost:5000/api/activities').then(response =>{
      setActivities(response.data);
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
    activity.id 
      ? setActivities([...activities.filter(x=>x.id !== activity.id), activity])
      : setActivities([...activities, {...activity, id: uuid()}]); //create id property when new object added 
    setEditing(false);
    setSelectedActivity(activity);
  }

  function DeleteActivityHandler(id: string){
    setActivities([...activities.filter(x=>x.id!== id)])
  }
  
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
        />
      </Container>
    </>
  );
}

export default App;
