
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Radio, RadioGroup, Panel, Form, Button, Stack } from 'rsuite';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AddPhotoAlternateSharpIcon from '@mui/icons-material/AddPhotoAlternateSharp';
import axios from '../../../../api/axios';
import { Select } from 'antd';
import '../Auth.scss';


const { Option } = Select;

export default function SignUp() {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('api/forgot-password/', { email });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Something went wrong');
      }
    }
  };



  return (
    <Stack direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
        height: '100vh',
        width: '100%',
      }}>
      <div className='panel'>
        <Panel
          header={
            <span
              style={{
                textAlign: 'center', fontSize: '1.5rem', alignContent: 'center', display: 'flex'
              }}
            >
              Enter Email for security varification
            </span>}
          bordered
          style={{
            background: '#fff', width: '100%', marginBottom: '2rem'
          }}
        >
          <hr style={{ border: '0.12rem solid rgb(173, 169, 169)' }} />
          <Form >
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center">
                <FormControl sx={{ m: 0.5, width: '40ch' }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-text">Email</InputLabel>
                  <Input
                    type="email"
                    name="uEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
              </div>
            </div>
            <div className="row py-4">
              <div className="col-md-12 d-flex justify-content-center">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  appearance="primary">
                  Send
                </Button>
              </div>
            </div>
            {message}
          </Form>
        </Panel>
      </div>
    </Stack>
  );
}
