import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../App/Stores/store";
import TextInput from "../../App/Utility/Form/TextInput";
import * as Yup from 'yup';
import ValidationError from "../ErrorHandling/ValidationError";
export default observer(function RegisterForm(){
    const {userStore} = useStore();

    return (
        <Formik
            initialValues={{displayName:'', username: '',email:'', password:'', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(error=>
                setErrors({error}))}
                validationSchema={Yup.object({
                    displayName: Yup.string().required(),
                    username: Yup.string().required(),
                    email: Yup.string().required().email(), //type of email
                    password: Yup.string().required(),

                })}
        >
            {({handleSubmit,isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign Up' color='blue' textAlign="center"/>
                    <TextInput name='displayName' placeholder="Display Name"/>
                    <TextInput name='username' placeholder="Username"/>
                    <TextInput name='email' placeholder="Email"/>
                    <TextInput name='password' placeholder="Password" type='password'/>
                    <ErrorMessage 
                        name='error' render={()=>
                        <ValidationError errors={errors.error} />}
                    />
                    <Button disabled={!isValid || !dirty ||isSubmitting}
                    loading={isSubmitting} positive content="Register" type='submit' fluid/>
                    
                </Form>
            )}

        </Formik>
    )
})