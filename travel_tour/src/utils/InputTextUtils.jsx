import React from 'react';
import TextField from '@mui/material/TextField';


export default function InputTextUtils({label,type,id,name}) {
  return (
    <>
         <TextField
            margin="dense"
            id={id}
            label={label}
            type={type}
            fullWidth
            variant="standard"
            name={name}
            required
                />
    </>
  )
}
