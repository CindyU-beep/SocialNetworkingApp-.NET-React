import { Activity } from "../../../App/Models/activity";
import { Button, Item, Label, Segment} from 'semantic-ui-react';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void; //not returning anything from this function. 
    cancelSelectedActivity: () => void;
    deleteActivity: (id: string) => void;
}
//Loads list of activities using Semantic UI
export default function ActivityList({activities, selectedActivity,selectActivity,cancelSelectedActivity, deleteActivity}: Props) {
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
                                <Button onClick={() => deleteActivity(activity.id)} floated='right' content='Delete' color='red'/>
                                <Label basic content={activity.category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>

    );
}