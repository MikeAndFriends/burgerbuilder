import React from 'react';
import Modal from '../../components/UI/Modal/Modal';

const purchaseBurgerSuccessMessage = props => {
    return (
      <Modal
        show={props.show}
        modalClosed={props.confirmed}>
        <div>
          <h1>Thank you for your order!</h1>
          <p>Won't be long..</p>
        </div>
      </Modal>
    );
}

export default purchaseBurgerSuccessMessage;
