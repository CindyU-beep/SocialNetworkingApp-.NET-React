import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../App/Stores/store";
import TextInput from "../../App/Utility/Form/TextInput";

export default observer(function LoginForm(){
    const {userStore} = useStore();

    return (
        <Formik
            initialValues={{email:'', password:'', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error=>
                setErrors({error:"Invalid email or password"}))}
        >
            {({handleSubmit,isSubmitting, errors}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Welcome Back' color='blue' textAlign="center"/>
                    <TextInput name='email' placeholder="Email"/>
                    <TextInput name='password' placeholder="Password" type='password'/>
                    <ErrorMessage 
                        name='error' render={()=>
                        <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/>}
                    />
                    <Button loading={isSubmitting} positive content="Login" type='submit' fluid/>
                    
                </Form>
            )}

        </Formik>
    )
})