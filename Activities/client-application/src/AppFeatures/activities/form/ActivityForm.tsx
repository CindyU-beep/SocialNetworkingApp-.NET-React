import { Form, Segment, Button} from "semantic-ui-react";
import { Activity } from "../../../App/Models/activity";
import { ChangeEvent, useState } from 'react';

interface Props{
    activity: Activity | undefined;
    formClose: ()=> void;
    activityActions: (activity: Activity)=>void;
}
export default function ActivityForm({activity: selectedActivity, formClose, activityActions}: Props){

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
        activityActions(activity);
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
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={FormChangeHandler}/>
                <Form.Input placeholder='City'value={activity.city} name='city' onChange={FormChangeHandler} />
                <Form.Input placeholder='Venue'value={activity.venue} name='venue' onChange={FormChangeHandler} />

                <Button onClick={SubmitFormHandler} floated='right' positive type='submit' content='Submit'></Button>
                <Button onClick={formClose} floated='right' type='button' content='Cancel'></Button>

            </Form>
            
        </Segment>
    );
}