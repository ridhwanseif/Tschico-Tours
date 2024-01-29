import React, { useState } from 'react'

import { Layout } from 'antd';
import { Form, Button, Stack, Checkbox, Panel } from 'rsuite';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Radio, RadioGroup } from 'rsuite';
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';




const { Sider, Content } = Layout;
export default function NewTechnician() {

    const [file, setFile] = useState("")

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    return (

        <>
            {/* <h6>back</h6> */}
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{
                    height: '100%',
                    width: '100%'
                }}>

                <Panel
                    header={<h6>Create an Account</h6>}
                    bordered
                    style={{ background: '#fff', width: '100%', marginTop: '10rem', marginBottom: '1rem' }}
                >

                    <Form>
                        <div className='row'>
                            <br />
                            <label>Personal Information:</label>

                            <div className='col-md-4'>
                                <FormControl sx={{ m: .5, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-text">First_Name</InputLabel>
                                    <Input
                                        type="text"
                                        id="fname"
                                        name="firstname"
                                    />
                                </FormControl>
                            </div>
                            <div className='col-md-4'>
                                <FormControl sx={{ m: .5, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-text">Last_Name</InputLabel>
                                    <Input
                                        type="text"
                                        id="lname"
                                        name="lastName"
                                    />
                                </FormControl>
                            </div>
                            <div className='col-md-4'>
                                <FormControl sx={{ m: .5, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-text">User_Name</InputLabel>
                                    <Input
                                        type="text"
                                        id="uname"
                                        name="userName"
                                    />
                                </FormControl>
                            </div>
                            <div className='col-md-4'>
                                <FormControl sx={{ m: .5, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-text"></InputLabel>
                                    <Input
                                        type="text"
                                        id="uname"
                                        name="userName"
                                    />
                                </FormControl>
                            </div>

                        </div>

                        <div className='row'>

                            <div className='col-md-4'>
                                <FormControl sx={{ m: .5, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
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

                            <div className='col-md-4'>
                                <FormControl sx={{ m: .5, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Comferm Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
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
                        </div>

                        <div className='row py-5'>

                            <div className='col-md-8'>
                                <div className='row'>
                                    <label>Contact information:</label>


                                    <div className='col-md-6'>
                                        <FormControl sx={{ m: .5, width: '25ch' }} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-text">Phone</InputLabel>
                                            <Input
                                                type="number"
                                                id="phone"
                                                name="phone"
                                            />
                                        </FormControl>
                                    </div>

                                    <div className='col-md-6'>
                                        <FormControl sx={{ m: .5, width: '25ch' }} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-text">Address</InputLabel>
                                            <Input
                                                type="text"
                                                id="address"
                                                name="address"
                                            />
                                        </FormControl>
                                    </div>

                                </div>

                                <div className='row'>

                                    <div className='col-md-6'>
                                        <FormControl sx={{ m: .5, width: '25ch' }} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-text">Email</InputLabel>
                                            <Input
                                                type="email"
                                                id="email"
                                                name="uEmail"
                                            />
                                        </FormControl>
                                    </div>

                                </div>

                            </div>

                            <div className='col-md-4'>
                                <Form.Group controlId="radioList">
                                    <label>Gender:</label>
                                    <RadioGroup name='radioList'>
                                        <Radio value='female' name='gander'>Male</Radio>
                                        <Radio value='male' name='gender'>Female</Radio>
                                    </RadioGroup>
                                </Form.Group>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <label>Paspot size:</label><br />
                                <FormControl variant="standard">
                                    <label htmlFor='image'>
                                        <img
                                            src={
                                                file
                                                    ? URL.createObjectURL(file)
                                                    : 'https://icon-library.com/icon/no-image-icon-0.html.html'
                                            }
                                            alt='error' />
                                    </label>
                                    <input
                                        type='file'
                                        id='image'
                                        onChange={(e) => setFile(e.target.files[0])}
                                        style={{ display: 'none' }} />
                                </FormControl>
                            </div>

                            <div className='col-md-4'>
                                <label>Saterficate:</label><br />
                                <FormControl variant="standard">
                                    <label htmlFor='file'>
                                        <DriveFolderUploadOutlined
                                            style={{
                                                fontSize: '3rem',
                                                cursor: 'pointer'
                                            }} />
                                    </label>
                                    <input
                                        type='file'
                                        id='file'
                                        onChange={(e) => setFile(e.target.files[0])}
                                        style={{ display: 'none' }} />
                                </FormControl>
                            </div>

                            <div className='col-md-4'>
                                <label>Work Station Location:<FmdGoodOutlinedIcon /></label>

                            </div>
                        </div>


                        <Form.Group>
                            <Stack style={{ marginLeft: -10 }}>
                                <Checkbox>I Agree</Checkbox>
                                <Button appearance="link">Terms and conditions.</Button>
                            </Stack>
                        </Form.Group>

                        <Form.Group>
                            <Stack spacing={6}>
                                <Button appearance="primary">Submit</Button>
                            </Stack>
                        </Form.Group>
                    </Form>

                </Panel>

            </Stack>

        </>

    )
}
