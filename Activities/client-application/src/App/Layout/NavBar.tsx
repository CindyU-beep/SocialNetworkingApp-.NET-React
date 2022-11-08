import { NavLink } from 'react-router-dom';
import { Container, Menu, Button } from 'semantic-ui-react';
import "../Layout/index.css";

export default function NavBar(){

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <i className="rocket icon"></i>
                    Codess Community
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name = 'Activities'/>
                <Menu.Item as={NavLink} to='/ErrorHandling' name = 'Errors'/>
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content = 'New Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
        
    );
}