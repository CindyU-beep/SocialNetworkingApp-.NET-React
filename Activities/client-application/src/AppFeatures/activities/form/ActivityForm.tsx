import { Segment, Button, Header} from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from 'react';
import { useStore } from "../../../App/Stores/store";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import TextInput from "../../../App/Utility/Form/TextInput";
import TextArea from "../../../App/Utility/Form/TextArea";
import SelectInput from "../../../App/Utility/Form/SelectInput";
import { CategoryOptions } from "../../../App/Utility/Form/Options/CategoryOptions";
import DateInput from "../../../App/Utility/Form/DateInput";
import { Activity } from "../../../App/Models/activity";
import { v4 as uuid } from 'uuid';
export default observer(function ActivityField(){
    const history = useHistory();
    const{activityStore} = useStore();
    const{loadActivity, createActivity, loading, loadingInitial, updateActivity} = activityStore;
    const{id} = useParams<{id:string}>();
    const [activity, setActivity] = useState<Activity>({
        //set inital value to empty fields
            id: '',
            title: '',
            category: '',
            description: '',
            date: null,
            city: '',
            venue:'',
        }
    );
    
    //Validation schema for REQUIRED user inputs
    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required('The activity category is required'),
        date: Yup.string().required('The activity date is required').nullable(),
        venue: Yup.string().required('The activity venue is required'),
        city: Yup.string().required('The activity city is required'),
    })

    useEffect(()=>{
        if(id) loadActivity(id).then(activity => setActivity(activity!)) //set state of activity
    }, [id,loadActivity]); //dependencies; only execute code once (i.e. rerender activities if change)

    if(loadingInitial) return <LoadingComponent/>

    function SubmitFormHandler(activity: Activity){
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



    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='blue'/>
            <Formik 
                validationSchema={validationSchema} 
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values => SubmitFormHandler(values)}> 

                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'> 
                {/*custom built user input object */}
                    <TextInput placeholder='Title' name='title'/>
                    <TextArea placeholder='Description' name='description' rows={3} /> 
                    <SelectInput options={CategoryOptions} placeholder={'Category'} name='category' />
                    <DateInput 
                        placeholderText='Date' 
                        name='date'
                        showTimeSelect
                        timeCaption = 'time'
                        dateFormat="d MMMM, yyyy h:mm aa"
                        
                    />
                    <Header content='Location Details' sub color='blue'/>
                    <TextInput placeholder='City' name='city' />
                    <TextInput placeholder='Venue' name='venue' />

                    <Button 
                        disabled={isSubmitting || !dirty || !isValid} //only able to submit if valid
                        loading={loading} 
                        floated='right' positive type='submit' content='Submit'>
                    </Button>
                    <Button as={Link} to='/activities' floated='right' type='button' content='Cancel'></Button>
                
                </Form>
                )}
            </Formik>
            
        </Segment>
    );
})