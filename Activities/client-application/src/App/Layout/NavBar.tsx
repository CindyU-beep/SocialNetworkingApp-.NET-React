import { NavLink } from 'react-router-dom';
import { Container, Menu, Button } from 'semantic-ui-react';
import "../Layout/index.css";

export default function NavBar(){

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src ="/assets/logo.png" alt="logo" style={{marginRight:'10px'}}/>
                    My Social Networking App
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