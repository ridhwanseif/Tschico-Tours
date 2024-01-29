import React from 'react';
import 'rsuite/dist/rsuite.min.css';
import { Modal, ButtonToolbar, Button} from 'rsuite';
import ButtonUtils from './ButtonUtils';
const styles = {
  radioGroupLabel: {
    padding: '8px 12px',
    display: 'inline-block',
    verticalAlign: 'middle'
  }
};

const DialogUtils2 = ({buttonIcon,
                       buttonApppearance,
                       buttonlabel,
                       dialodTilte,
                       dialogContactBody,
                       dialogActionLaleb1,
                       dialogActionLaleb2}) => {
                        const [open, setOpen] = React.useState(false);
                        const handleOpen = () => setOpen(true);
                        const handleClose = () => setOpen(false);

  return (
    <>
     
      <hr />
      <ButtonToolbar>
        <div onClick={handleOpen}>
            <ButtonUtils
            label={buttonlabel}
            buttonApppearance={buttonApppearance}
            startbuttonIcon={buttonIcon}
            /></div>
      </ButtonToolbar>

      <Modal backdrop='static' keyboard={false} open={open} size={'xs'} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{dialodTilte}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {dialogContactBody}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            {dialogActionLaleb1}
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            {dialogActionLaleb2}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DialogUtils2;