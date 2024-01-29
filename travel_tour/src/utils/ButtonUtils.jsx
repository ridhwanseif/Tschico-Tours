import React from 'react';
import { Button } from 'rsuite';


export default function ButtonUtils({btnSize,label,Apppearance,startbuttonIcon,endbuttonIcon}) {
  return (
    <>
          <Button 
            appearance={Apppearance}
            startIcon={startbuttonIcon}
            endIcon={endbuttonIcon}
            size={btnSize}
            >
                {label}
          </Button>
    </>
  )
}
