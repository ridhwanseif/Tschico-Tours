import React from 'react';
import { Modal, ButtonToolbar, Button } from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';
import ButtonUtils from './ButtonUtils';
import Stack from 'rsuite/Stack';
import { BsFacebook } from 'react-icons/bs';
import { LoginOutlined } from '@mui/icons-material';


const DialogUtils = ({buttonIcon,
                      buttonlabel,
                      buttonApppearance,
                      dialogContactBody,
                      dialogActionLaleb2}) => {
                        const [open, setOpen] = React.useState(false);
                        const handleOpen = () => setOpen(true);
                        const handleClose = () => setOpen(false);

  return (
    <Stack>
      <ButtonToolbar onClick={handleOpen}>
        {/* <ButtonUtils 
          startbuttonIcon={buttonIcon}
          label={buttonlabel}
          buttonApppearance={buttonApppearance}/> */}
          <a href='#'><LoginOutlined/></a>
      </ButtonToolbar>

      <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
        <Modal.Body>
          {dialogContactBody}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={handleClose} appearance="primary">
            {dialogActionLaleb1}
          </Button> */}
          <Button onClick={handleClose} appearance="subtle">
            {dialogActionLaleb2}
          </Button>
        </Modal.Footer>
      </Modal>
    </Stack>
  );
};

export default DialogUtils;