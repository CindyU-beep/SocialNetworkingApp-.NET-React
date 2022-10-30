import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Container } from 'semantic-ui-react';
import { Activity } from '../Models/activity';
import NavBar from './NavBar';


function App() {
  const[activities, setActivities] = useState<Activity[]>([])

  useEffect(()=> { //
    axios.get('http://localhost:5000/api/activities').then(response =>{
      setActivities(response.data);
    })
  }, [] ) //ensures only runs once; gets activities once to prevent infinite loop
  
  return (
    <div className='body'>
      <NavBar/>
      <Container style={{marginTop: '7em'}}/>
        <List>
          {activities.map((activity) => ( //typeof activity
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
