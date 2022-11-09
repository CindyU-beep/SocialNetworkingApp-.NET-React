import { Form, Segment, Button} from "semantic-ui-react";
import { ChangeEvent, useState } from 'react';
import { useStore } from "../../../App/Stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityForm(){
    const{activityStore} = useStore();
    const{selectedActivity, formClose, createActivity, updateActivity, loading} = activityStore;
    
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date:'',
        city: '',
        venue:'',
    }

    const [activity, setActivity] = useState(initialState);

    function SubmitFormHandler(){
        activity.id ? updateActivity(activity) : createActivity(activity)
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
                <Button onClick={formClose} floated='right' type='button' content='Cancel'></Button>

            </Form>
            
        </Segment>
    );
})