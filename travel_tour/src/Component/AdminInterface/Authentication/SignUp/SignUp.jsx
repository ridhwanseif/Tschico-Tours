import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import ViewsInterface from '../../../ViewsInterface';
import { Radio, RadioGroup, Panel, Form, Stack } from 'rsuite';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AddPhotoAlternateSharpIcon from '@mui/icons-material/AddPhotoAlternateSharp';
import axios from '../../../../api/axios';
import { Select, Button, Alert } from 'antd';
import '../Auth.scss'

const { Option } = Select;

export default function SignUp() {

    // start handleGender
    const handleGender = (value) => {
        console.log(value)
        setGender(value)
    };

    // end handleGender

    // selected
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setSelectedValue(value);
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('roles/');
                const roleOptions = response.data.map((role) => {
                    if (role.id !== 1) {
                        return {
                            value: role.id,
                            label: role.name,
                        };
                    } else {
                        return null; // Skip the role with id 1
                    }
                })
                    .filter(Boolean); // Filter out null values
                setOptions(roleOptions);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    // end selected

    // upload
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    // end

    // password
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };
    // end password

    // imputField
    const [password, setPassword] = useState('');
    const [ComPassword, setComPassword] = useState('')
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [mid_name, setMidName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
    }, [ComPassword, password])

    // end imputField

    const handleSubmit = () => {



        if (password !== ComPassword) {
            setError(<Alert type="error" message='You have entered different passwords.' banner />);
        }
        else {

            // Prepare the form data
            const formData = new FormData();
            formData.append('first_name', first_name);
            formData.append('last_name', last_name);
            formData.append('mid_name', mid_name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('username', username);
            formData.append('address', address);
            formData.append('gender', gender);
            formData.append('phone_number', phone_number);
            formData.append('photo', photo);
            formData.append('role', 1);
            // Send the POST request
            axios.post('register/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    // Handle the response
                    console.log(response.data);
                    setComPassword('')
                    setPassword('');
                    setFirstName('');
                    setLastName('');
                    setMidName('');
                    setGender('');
                    setEmail('');
                    setUserName('');
                    setAddress('');
                    setPhoneNumber('');
                    setSelectedValue('')
                    setPhoto(null);
                    setFile(null);
                })
                .catch((error) => {
                    // Handle the error
                    console.error(error);
                });
        }
    };
    // end Send the POST request

    const handlePhoto = (e) => {
        setFile(e.target.files[0]);
        setPhoto(e.target.files[0]);
        console.log(e.target.files[0])
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
                                textAlign: 'center', fontSize: '1.5rem', alignContent: 'center',
                                display: 'flex', marginTop: '2rem', alignItems: 'center', marginLeft: '18rem'
                            }}
                        >
                            Create an Account
                        </span>}
                    bordered
                    style={{ background: '#fff', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}
                >
                    <p>
                        <span>Already have an account? </span>
                        <Link to="/"
                        // element={ViewsInterface}
                        >
                            Sign in here
                        </Link>
                    </p>
                    <br />
                    <hr style={{ border: '0.12rem solid rgb(173, 169, 169)' }} />
                    <Form onSubmit={handleSubmit}>
                        <div className="row">
                            <label>Personal Information:</label>
                            <div className="col-md-4">
                                <FormControl sx={{ m: 0.5, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-text">First_Name</InputLabel>
                                    <Input
                                        autoFocus
                                        required='true'
                                        type="text"
                                        name="firstname"
                                        value={first_name}
                                        onChange={(e) => setFirstName(e.target.value)} />
                                </FormControl>
                            </div>
                            <div className="col-md-4">
                                <FormControl sx={{ m: 0.5, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-text">Mid_Name</InputLabel>
                                    <Input
                                        required='true'
                                        type="text"
                                        name="midName"
                                        value={mid_name}
                                        onChange={(e) => setMidName(e.target.value)} />
                                </FormControl>
                            </div>
                            <div className="col-md-4">
                                <FormControl sx={{ m: 0.5, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-text">Last_Name</InputLabel>
                                    <Input
                                        required='true'
                                        type="text"
                                        name="lastName"
                                        value={last_name}
                                        onChange={(e) => setLastName(e.target.value)} />
                                </FormControl>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <FormControl sx={{ m: 0.5, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-text">User_Name</InputLabel>
                                    <Input
                                        required='true'
                                        type="text"
                                        name="userName"
                                        value={username}
                                        onChange={(e) => setUserName(e.target.value)} />
                                </FormControl>
                            </div>
                            <div className="col-md-4">
                                <FormControl sx={{ m: 0.5, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        required='true'
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
                            </div>
                            <div className="col-md-4">
                                <FormControl sx={{ m: 0.5, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                                    <Input
                                        required='true'
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
                                {error && <p>{error}</p>}
                            </div>
                        </div>
                        <div className="row py-3">
                            <div className="col-md-8">
                                <div className="row">
                                    <label>Contact information:</label>
                                    <div className="col-md-6">
                                        <FormControl sx={{ m: 0.5, width: '25ch' }} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-text">Phone</InputLabel>
                                            <Input
                                                required='true'
                                                type="number"
                                                name="phone"
                                                value={phone_number}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl sx={{ m: 0.5, width: '25ch' }} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-text">Address</InputLabel>
                                            <Input
                                                required='true'
                                                type="text"
                                                name="address"
                                                value={address} onChange={(e) => setAddress(e.target.value)} />
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <FormControl sx={{ m: 0.5, width: '25ch' }} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-text">Email</InputLabel>
                                            <Input
                                                required='true'
                                                type="email"
                                                name="uEmail"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <Form.Group controlId="radioList">
                                    <label>Gender:</label>
                                    <RadioGroup
                                        required='true'
                                        name="radioList"
                                        value={gender}
                                        onChange={handleGender}>
                                        <Radio value="male" name="gander">
                                            Male
                                        </Radio>
                                        <Radio value="female" name="gender">
                                            Female
                                        </Radio>
                                    </RadioGroup>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row py-4">
                            <div className="col-md-4">
                                <label>Upload your photo:</label>
                                <div>
                                    {photo ? (
                                        <img src={URL.createObjectURL(photo)} alt="Uploaded" />
                                    ) : (
                                        <label htmlFor="file-upload" className="custom-file-upload">
                                            <AddPhotoAlternateSharpIcon
                                                className="upload-icon"
                                                style={{
                                                    fontSize: '3rem',
                                                    margin: '1rem 0 -1rem 0',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                            <input
                                                required='true'
                                                style={{ display: 'none' }}
                                                type="file"
                                                id="file-upload"
                                                onChange={handlePhoto}
                                                accept=".jpg,.jpeg,.png"
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>
                            {/* <div className="col-md-2">
                                <label>Role:</label>
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select a role"
                                    optionFilterProp="children"
                                    value={selectedValue}
                                    onChange={handleChange}
                                    onSearch={onSearch}
                                    loading={loading}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {options.map((role) => (
                                        <Option
                                            required='true'
                                            key={role.value}
                                            value={role.value}>
                                            {role.label}
                                        </Option>
                                    ))}
                                </Select>
                            </div> */}
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-end">
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    // onClick={handleSubmit}
                                    disabled={uploading}>
                                    {uploading ? 'Uploading...' : 'Create Account'}
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Panel>
            </div>
        </Stack>
    );
}
