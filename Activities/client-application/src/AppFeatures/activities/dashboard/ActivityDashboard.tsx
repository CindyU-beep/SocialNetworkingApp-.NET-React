import { Grid, List } from "semantic-ui-react";
import { Activity } from '../../../App/Models/activity';
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
interface Props {
    activities: Activity[];
}
//Displays a Dashboard of Activities
export default function ActivityDashboard({activities}: Props) { //destructure property
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {activities[0] && //only runs if activity does exist
                <ActivityDetails activity={activities[0]}/>}
                <ActivityForm/>
            </Grid.Column>
            
        </Grid>
    )
}