import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function DialogUtils1({buttonIcon,Buttonclass,buttonlabel,dialodTilte,dialogContactText,dialogContact,dialogActionLaleb1,dialogActionLaleb2}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={Buttonclass} startIcon={buttonIcon} onClick={handleClickOpen}>
        {buttonlabel}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            {dialodTilte}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
                {dialogContactText}
          </DialogContentText>
            {dialogContact}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{dialogActionLaleb1}</Button>
          <Button onClick={handleClose}>{dialogActionLaleb2}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
