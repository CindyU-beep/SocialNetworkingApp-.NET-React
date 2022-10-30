import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import "../Layout/index.css";
import ActivityDashboard from '../../AppFeatures/activities/dashboard/ActivityDashboard';
import { Activity } from '../Models/activity';

function App() {
  const[activities, setActivities] = useState<Activity[]>([])

  useEffect(()=> { //
    axios.get('http://localhost:5000/api/activities').then(response =>{
      setActivities(response.data);
    })
  }, [] ) //ensures only runs once; gets activities once to prevent infinite loop
  
  return (
    <>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activities={activities}/>
      </Container>
    </>
  );
}

export default App;
