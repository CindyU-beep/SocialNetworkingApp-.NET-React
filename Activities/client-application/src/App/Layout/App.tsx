import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import "../Layout/index.css";
import ActivityDashboard from '../../AppFeatures/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../Stores/store';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import HomePage from '../../AppFeatures/home/HomePage';
import ActivityForm from '../../AppFeatures/activities/form/ActivityForm';
import ActivityDetails from '../../AppFeatures/activities/details/ActivityDetails';

function App() {
  const{activityStore}=useStore();//MobX to manage state

  useEffect(()=> {
    activityStore.loadActivities();
  }, [activityStore] ) //ensures only runs once; gets activities once to prevent infinite loop


  if (activityStore.loadingInitial) return <LoadingComponent content='Loading. . .'/>
  
  return (
    <>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/activities' component={ActivityDashboard}/>
        <Route path='/activities/:id' component={ActivityDetails}/>
        <Route path='/createActivity' component={ActivityForm}/>
      </Container>
    </>
  );
}

export default observer(App); //make observable 
