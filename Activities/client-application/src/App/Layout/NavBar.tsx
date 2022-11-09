import { Container, Menu, Button } from 'semantic-ui-react';
import "../Layout/index.css";
import {useStore} from '../Stores/store';

export default function NavBar(){

    const {activityStore} = useStore();

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src ="/assets/logo.png" alt="logo" style={{marginRight:'10px'}}/>
                    My Social Networking App
                </Menu.Item>
                <Menu.Item name = 'Activities'/>
                <Menu.Item>
                    <Button onClick={() => activityStore.formOpen()} positive content = 'New Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
        
    );
}