import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Radio, RadioGroup, Panel, Form, Button, Stack } from 'rsuite';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import '../Auth.scss'
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import axios from '../../../../api/axios';
import { Select } from 'antd';


const { Option } = Select;


export default function ResetPassword() {

    // password
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };
    // end password
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [ComPassword, setComPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`api/reset-password/${token}/`, { password });
            setMessage(response.data.message);
            setToken('');
            setPassword('');
            setComPassword('');
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
                height: '100%',
                width: '100%'
            }}>

            <div className='panel'>
                <Panel
                    header={
                        <span
                            style={{
                                textAlign: 'center', fontSize: '1.5rem', alignContent: 'center', display: 'flex',
                                borderRadius: '10rem'
                            }}
                        >
                            Password Reset:
                        </span>}
                    bordered
                    style={{ background: '#fff', width: '100%', marginTop: '8rem' }}
                >
                    <hr style={{ border: '0.12rem solid rgb(173, 169, 169)' }} />
                    <Form >
                        <div className="row">
                           
                            <div className="col-md-12 row d-flex justify-content-center">
                                <FormControl sx={{ m: 0.5, width: '30ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">New Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password1"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            
                                <FormControl sx={{ m: 0.5, width: '30ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Confirm New Password</InputLabel>
                                    <Input
                                        value={ComPassword}
                                        onChange={(e) => setComPassword(e.target.value)}
                                        id="standard-adornment-password2"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                            </div>
                            <div className="col-md-12 d-flex justify-content-center">
                                <FormControl sx={{ m: 0.5, width: '43ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-text">Enter_Token</InputLabel>
                                    <Input
                                        type="text"
                                        name="token"
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)} />
                                </FormControl>
                            </div>

                            <div className="col-md-12 d-flex justify-content-center py-4">
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                    appearance="primary">
                                    Verify
                                </Button>
                            </div>
                        </div>
                        <p>{message}</p>
                    </Form>
                </Panel>
            </div>
        </Stack>
    );
}
