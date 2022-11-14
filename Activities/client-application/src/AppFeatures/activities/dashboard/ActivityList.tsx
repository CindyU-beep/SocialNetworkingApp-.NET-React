import { Header} from 'semantic-ui-react';
import { useStore } from "../../../App/Stores/store";
import { observer } from "mobx-react-lite";
import ActivityListOfItems from './ActivityListOfItems';
import { Fragment } from 'react';

//Loads list of activities using Semantic UI
export default observer (function ActivityList() {
    const{activityStore} = useStore();
    const{groupedActivities} = activityStore;
    return (
        <>
            {groupedActivities.map(([group, activities]) =>
            <Fragment key={group}>
                <Header sub >{group} </Header>
                {activities.map((activity) => ( //typeof activity
                    <ActivityListOfItems key={activity.id} activity={activity} />
                ))}
            </Fragment>
            )}
        </>
    );
})