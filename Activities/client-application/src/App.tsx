import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { List, Header } from 'semantic-ui-react';

function App() {
  const[activities, setActivities] = useState([])

  useEffect(()=> { //
    axios.get('http://localhost:5000/api/activities').then(response =>{
      console.log(response);
      setActivities(response.data);
    })
  }, [] ) //ensures only runs once; gets activities once to prevent infinite loop
  
  return (
    <div>
      <Header as='h2' icon='users' content='Activities' />
        <List>
          {activities.map((activity: any) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
