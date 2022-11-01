import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../App/Stores/store";
import { observer } from "mobx-react-lite";

//Displays a Dashboard of Activities
export default observer( function ActivityDashboard() { //destructure property
    
    const {activityStore} = useStore();
    const {selectedActivity, editing} = activityStore;
    
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editing && //only runs if activity does exist and not editing
                <ActivityDetails />}
                {editing &&
                    <ActivityForm />
                }
            </Grid.Column>
        </Grid>
    )
})
