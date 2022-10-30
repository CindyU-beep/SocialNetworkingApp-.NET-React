import { Activity } from "../../../App/Models/activity";
import { Button, Item, Label, Segment} from 'semantic-ui-react';

interface Props {
    activities: Activity[];
}
//Loads list of activities using Semantic UI
export default function ActivityList({activities}: Props) {
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
                                <Button floated='right' content='View' color='green'/>
                                <Label basic content={activity.category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>

    );
}