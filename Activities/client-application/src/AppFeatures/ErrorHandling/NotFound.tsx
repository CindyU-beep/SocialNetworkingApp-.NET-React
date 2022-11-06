import { Link } from 'react-router-dom';
import {Button, Header, Icon, Segment} from 'semantic-ui-react';

export default function NotFound(){
    return(
    <Segment placeholder>
        <Header icon>
            <Icon name='search'/>
            Oops - we've looked everywhere and were not able to find the page you're looking for 
        </Header>
        <Segment.Inline>
            <Button as={Link} to='/activities' primary>
                Return to activities page
            </Button>
        </Segment.Inline>
    </Segment>

    );

}