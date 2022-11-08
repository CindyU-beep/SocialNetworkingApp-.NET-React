import { Link } from 'react-router-dom';
import { Container, Header, Segment, Button } from 'semantic-ui-react';

export default function HomePage(){
    return (
       <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    Codess Community
                </Header>
                <Header as='h2' inverted content='Welcome to the Codess Women in Tech Community'/>
                
                <Button as={Link} to='/activities' size='huge' inverted className="terminal icon" style={{marginRight:'10px'}}>
                    <p><i className="terminal icon" />  Start Journey</p>
                </Button>
            </Container>
       </Segment>
        
    )
}