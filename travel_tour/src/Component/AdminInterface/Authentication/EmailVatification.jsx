import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Radio, RadioGroup, Panel, Form, Button, Stack } from 'rsuite';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import './Auth.scss'
import axios from '../../../api/axios';
import { Select } from 'antd';


const { Option } = Select;

export default function EmailVarification() {

    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`verify/${token}/`);
            setMessage(response.data.message);
            setToken('');
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
                                textAlign: 'center', fontSize: '1.5rem', alignContent: 'center', display: 'flex'
                            }}
                        >
                            verify your Email
                        </span>}
                    bordered
                    style={{ background: '#fff', width: '100%', marginTop: '10rem' }}
                >
                    <hr style={{ border: '0.12rem solid rgb(173, 169, 169)' }} />
                    <Form >
                        <div className="row">
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
                            <div className="col-md-12 d-flex justify-content-center py-3">
                                <Button
                                    type="submit"
                                    onClick={handleVerify}
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
