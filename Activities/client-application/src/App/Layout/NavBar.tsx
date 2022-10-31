import { Container, Menu, Button } from 'semantic-ui-react';
import "../Layout/index.css";

interface Props{
    formOpen: () => void; 
}
export default function NavBar({formOpen}: Props){
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src ="/assets/logo.png" alt="logo" style={{marginRight:'10px'}}/>
                    My Social Networking App
                </Menu.Item>
                <Menu.Item name = 'Activities'/>
                <Menu.Item>
                    <Button onClick={formOpen} positive content = 'New Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
        
    );
}