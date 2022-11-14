import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Button, Image } from 'semantic-ui-react';
import { useStore } from '../../App/Stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

export default observer(function HomePage() {
    const {userStore, modalStore} = useStore();
    
    return (
        <>
        
        <Segment inverted textAlign='center' vertical className='masthead'>
        <Image src="/assets/Codess.png" size='massive' floated='right' />

            <Container text>
                <Header as='h1' inverted>
                    Codess Women in Tech Community
                </Header>
                <Header as='h3' inverted>
                <i className="terminal icon" />  Kickstart Your Journey
                </Header>

               {userStore.LoggedIn ? (// if user is logged in, show activities button
                    <>
                    <Button as={Link} to='/activities' size='huge' inverted >
                        Go to Activities
                    </Button>
                    </>
               ) : ( 
                <>
                <Button onClick={()=>modalStore.openModal(<LoginForm/>)} size='huge' inverted>
                   Login
                </Button>
                <Button onClick={()=> modalStore.openModal(<RegisterForm/>)} size='huge' inverted>
                   Register
                </Button>
                </>
            )}
            </Container>
        </ Segment>
        </>
    );
})