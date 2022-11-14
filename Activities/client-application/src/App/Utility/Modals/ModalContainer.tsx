import { Modal } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../Stores/store';

//For styling
export default observer (function ModalContainer(){
    const {modalStore} = useStore();
    return (
        <Modal open={modalStore.modal.open} onClose={modalStore.closeModal} size='mini'>
          <Modal.Content>{modalStore.modal.body}</Modal.Content>
        </Modal>
      );

})