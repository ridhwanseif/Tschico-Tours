import React, { useEffect, useState } from 'react';
import { Modal, ButtonToolbar } from 'rsuite';
import { Radio, RadioGroup, Panel, Form, Stack } from 'rsuite';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import AddPhotoAlternateSharpIcon from '@mui/icons-material/AddPhotoAlternateSharp';
import axios from '../../api/axios';
import { Select, Button } from 'antd';

const { Option } = Select;

const UpdateUserForm = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();

  const handleOpen = value => {
    setSize(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
        const roleOptions = response.data
          .map((role) => {
            // if (role.id !== 1) {
            return {
              value: role.id,
              label: role.name,
            };
            // } else {
            //   return null; // Skip the role with id 1
            // }
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
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [mid_name, setMidName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState([]);
  const [phone_number, setPhoneNumber] = useState('');
  const [photo, setPhoto] = useState(null);
  // end imputField

  // Fetch
  const fetchDataUpdate = async () => {
    try {
      const response = await axios.get(`user/detail/${userId}/`);
      setFirstName(response.data.first_name)
      setLastName(response.data.last_name)
      setUserName(response.data.username)
      setMidName(response.data.mid_name)
      setAddress(response.data.address)
      setEmail(response.data.email)
      setGender(response.data.gender)
      setPhoneNumber(response.data.phone_number)
      // setPhoto(response.data.photo)
      setRole(response.data.role)
      setPassword(response.data.password)

    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataUpdate();
  }, [userId]);
  // End of Fetch

  const handleSubmit = () => {
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
    formData.append('role', selectedValue);

    // Send the POST request
    axios.post('api/register/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        // Handle the response
        console.log(response.data);
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
  };
  // end Send the POST request

  const handlePhoto = (e) => {
    setFile(e.target.files[0]);
    setPhoto(e.target.files[0]);
    console.log(e.target.files[0])
  };

  return (
    <>
      <ButtonToolbar>
        <Button size="md" onClick={() => handleOpen('lg')}>
          Edit
        </Button>
      </ButtonToolbar>
      <Modal size={size} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Upadate User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* start of form */}
          <Panel
            bordered
            style={{ background: '#fff', width: '98%' }}
          >
            <Form onSubmit={handleSubmit}>
              <div className="row">
                {/* <label>Personal Information:</label> */}
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
                    <InputLabel htmlFor="standard-adornment-text">Last_Name</InputLabel>
                    <Input
                      required='true'
                      type="text"
                      name="lastName"
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)} />
                  </FormControl>
                </div>
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
              </div>
              <div className="row">
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
                <div className="col-md-4">
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
              <div className="row py-1">
                <div className="col-md-4">
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
                    {options.map((roles) => (
                      <Option
                        required='true'
                        key={roles.value}
                        value={roles.value}
                      >
                        {roles.label}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="col-md-4">
                  <Form.Group controlId="radioList">
                    <label>Gender:</label>
                    <RadioGroup
                      required='true'
                      name="radioList"
                      value={gender}
                      onChange={handleGender}>
                      <Radio value="female" name="gander">
                        Male
                      </Radio>
                      <Radio value="male" name="gender">
                        Female
                      </Radio>
                    </RadioGroup>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
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

              </div>

            </Form>
          </Panel>
          {/* end of form */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateUserForm;
