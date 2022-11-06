import { observer } from "mobx-react-lite";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../App/Stores/store";

export default observer( function ServerError(){
    const{utilityStore} = useStore();
    return(
        <Container>
            <Header as='h1' content='Server Error'/>
            <Header sub as='h5' color='red' content={utilityStore.error?.message}/>
            {utilityStore.error?.details &&
                <Segment>
                    <Header as='h4' content="Stack Trace" color='green'/>
                    <code style={{marginTop: '10px'}}>{utilityStore.error.details}</code>
                </Segment>
            }
        </Container>
    )
})