import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../App/Models/activity';

interface Props{
    activity: Activity;
    cancelSelectedActivity: () => void;
    formOpen: (id: string) => void;
}
export default function ActivityDetails({activity, cancelSelectedActivity, formOpen}: Props){
    return(
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
            <Card.Content>
                <Card.Header>{activity.title} </Card.Header>
                <Card.Meta>
                    <span> {activity.date} </span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => formOpen(activity.id)} basic color='green' content='Edit'/>
                    <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel'/>

                </Button.Group>
            </Card.Content>
        </Card>
    );
}