import { Button } from 'antd';
import React, { useState } from 'react';
import { Modal, ButtonToolbar, Placeholder } from 'rsuite';

const Modal1 = ({ ModalTitle, AddForm, label, Type, Close }) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const handleOpen = value => {
    setSize(value);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <ButtonToolbar>

        <Button type={Type} onClick={() => handleOpen('md')}>
          {label}
        </Button>
      </ButtonToolbar>
      <Modal size={size} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{ModalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div >
            {AddForm}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{marginLeft: '.5rem'}} onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal >
    </>
  );
};

export default Modal1;