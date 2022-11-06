import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import "../Layout/index.css";
import ActivityDashboard from '../../AppFeatures/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../Stores/store';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../AppFeatures/home/HomePage';
import ActivityForm from '../../AppFeatures/activities/form/ActivityForm';
import ActivityDetails from '../../AppFeatures/activities/details/ActivityDetails';
import TestErrors from '../../AppFeatures/ErrorHandling/TestErrors';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../AppFeatures/ErrorHandling/NotFound';
import ServerError from '../../AppFeatures/ErrorHandling/ServerError';

function App() {
  const{activityStore}=useStore();//MobX to manage state
  const location = useLocation();

  useEffect(()=> {
    activityStore.loadActivities();
  }, [activityStore] ) //ensures only runs once; gets activities once to prevent infinite loop


  if (activityStore.loadingInitial) return <LoadingComponent />
  
  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage}/>
      <Route 
        path={'/(.+)'}
        render={()=>(
          <>
            <NavBar/>
            <Container style={{marginTop: '7em'}}>
              <Switch>
                <Route exact path='/activities' component={ActivityDashboard}/>
                <Route path='/activities/:id' component={ActivityDetails}/>
                <Route key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm}/>
                <Route path='/ErrorHandling' component={TestErrors}/>
                <Route path='/server-error' component={ServerError}/>
                <Route component={NotFound}/>
              </Switch>

            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App); //make observable 
