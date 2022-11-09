import { Button, Item, Label, Segment} from 'semantic-ui-react';
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../App/Stores/store";
import { observer } from "mobx-react-lite";

//Loads list of activities using Semantic UI
export default observer (function ActivityList() {
    const [target, setTarget] = useState('');
    const{activityStore} = useStore();
    const{deleteActivity,activitiesByDate,loading} = activityStore

    function DeleteActiityHandler(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map((activity) => ( //typeof activity
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => activityStore.selectActivity(activity.id)} floated='right' content='View' color='green'/>
                                <Button 
                                    name={activity.id}
                                    loading={loading && target === activity.id}  //targetting single individual button instead of all buttons
                                    onClick={(e) => DeleteActiityHandler(e,activity.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red'
                                />
                                <Label basic content={activity.category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
})