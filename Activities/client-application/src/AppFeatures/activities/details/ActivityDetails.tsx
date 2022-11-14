import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {useParams } from 'react-router-dom';
import { Grid, GridColumn } from 'semantic-ui-react';
import LoadingComponent from '../../../App/Layout/LoadingComponent';
import { useStore } from '../../../App/Stores/store';
import ActivityDetailChat from './ActivityDetailChat';
import ActivityDetailHeader from './ActivityDetailHeader';
import ActivityDetailInfo from './ActivityDetailInfo';
import ActivityDetailSidebar from './ActivityDetailSidebar';

export default observer (function ActivityDetails(){

    const {activityStore} = useStore();
    const{selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const{id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]); //dependencies

    if (loadingInitial || !activity) return <LoadingComponent />;

    return(
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailHeader activity={activity}/>
                <ActivityDetailInfo activity={activity}/>
                <ActivityDetailChat/>
            </Grid.Column>
            <GridColumn width={6}>
                <ActivityDetailSidebar/>
            </GridColumn>
        </Grid>

    );
});