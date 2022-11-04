import { Form, Segment, Button} from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from 'react';
import { useStore } from "../../../App/Stores/store";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import {v4 as uuid} from 'uuid';


export default observer(function ActivityForm(){
    const history = useHistory();
    const{activityStore} = useStore();
    const{loadActivity, createActivity, loading, loadingInitial, updateActivity} = activityStore;
    const{id} = useParams<{id:string}>();
    const [activity, setActivity] = useState({
        //set inital value to empty fields
            id: '',
            title: '',
            category: '',
            description: '',
            date:'',
            city: '',
            venue:'',
        }
    );

    useEffect(()=>{
        if(id) loadActivity(id).then(activity => setActivity(activity!)) //set state of activity
    }, [id,loadActivity]); //dependencies; only execute code once (i.e. rerender activities if change)

    if(loadingInitial) return <LoadingComponent/>

    function SubmitFormHandler(){
        if(activity.id.length === 0){ //if len 0, create new activity 
            let newActivity ={
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(()=> history.push(`/activities/${newActivity.id}`));
        } else { //update existing activity
            updateActivity(activity).then(() =>history.push(`/activities/${activity.id}`));

        }
    }

    function FormChangeHandler(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={SubmitFormHandler} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={FormChangeHandler}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={FormChangeHandler} />
                <Form.Input placeholder='Category'value={activity.category} name='category' onChange={FormChangeHandler} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={FormChangeHandler}/>
                <Form.Input placeholder='City'value={activity.city} name='city' onChange={FormChangeHandler} />
                <Form.Input placeholder='Venue'value={activity.venue} name='venue' onChange={FormChangeHandler} />

                <Button loading={loading} onClick={SubmitFormHandler} floated='right' positive type='submit' content='Submit'></Button>
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel'></Button>

            </Form>
            
        </Segment>
    );
})