import React from 'react';
import { Stack } from 'rsuite';


export default function TextAreaUtils(name,id,placeholder) {
  return (
    <Stack>
      <textarea 
        name={name}
        class="form-control" 
        id={id} 
        rows="5"
        cols="50"
        color='yellow'
        placeholder={placeholder}
        required>
        </textarea>

    </Stack>
  )
}
