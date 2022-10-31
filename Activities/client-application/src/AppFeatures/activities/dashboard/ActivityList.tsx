import { Activity } from "../../../App/Models/activity";
import { Button, Item, Label, Segment} from 'semantic-ui-react';
import { SyntheticEvent, useState } from "react";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void; //not returning anything from this function. 
    cancelSelectedActivity: () => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}
//Loads list of activities using Semantic UI
export default function ActivityList({activities, selectedActivity,selectActivity,cancelSelectedActivity, deleteActivity, submitting}: Props) {
    const [target, setTarget] = useState('');

    function DeleteActiityHandler(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {activities.map((activity) => ( //typeof activity
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectActivity(activity.id)} floated='right' content='View' color='green'/>
                                <Button 
                                    name={activity.id}
                                    loading={submitting && target === activity.id}  //targetting single individual button instead of all buttons
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
}