import { Grid } from "semantic-ui-react";
import { Activity } from '../../../App/Models/activity';
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void; //not returning anything from this function. 
    cancelSelectedActivity: () => void;
    editing: boolean;
    formOpen: () =>void;
    formClose: ()=>void;
    activityActions: (activity: Activity)=>void
    deleteActivity: (id: string) =>void;
    submitting: boolean;
}
//Displays a Dashboard of Activities
export default function ActivityDashboard({activities, selectedActivity,selectActivity,
    cancelSelectedActivity, editing, formOpen,formClose, activityActions,deleteActivity, submitting}: Props) { //destructure property
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} 
                selectActivity={selectActivity} 
                selectedActivity={selectedActivity} 
                cancelSelectedActivity={cancelSelectedActivity} 
                deleteActivity={deleteActivity}
                submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editing && //only runs if activity does exist and not editing
                <ActivityDetails 
                    activity={selectedActivity} 
                    cancelSelectedActivity={cancelSelectedActivity}
                    formOpen={formOpen}
                />}
                {editing &&
                    <ActivityForm 
                        formClose={formClose} 
                        activity={selectedActivity} 
                        activityActions={activityActions}
                        submitting={submitting}
                    />
                }
            </Grid.Column>
        </Grid>
    )
}