import React, { useState, useEffect } from 'react';
import './service.scss';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import axios from '../../../../api/axios';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Modal, ButtonToolbar } from 'rsuite';

export const EditService = ({ serviceId }) => {
    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState();
    const handleOpen = value => {
        setSize(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const [file, setFile] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [service_name, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const Navigate = useNavigate();


    // Fetch
    const fetchDataUpdate = async () => {
        try {
            const response = await axios.get(`services/detail/${serviceId}/`);
            setServiceName(response.data.service_name);
            setDescription(response.data.description);
            setPhoto(response.data.photo)
        } catch (error) {
            console.log('Error fetching data:', error);
        }
        handleClose()
    };

    useEffect(() => {
        fetchDataUpdate();
    }, [serviceId]);
    // End of Fetch

    const handlePhoto = (e) => {
        setFile(e.target.files[0]);
        setPhoto(e.target.files[0]);
        console.log(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare the form data
        const formData = new FormData();
        formData.append('service_name', service_name);
        formData.append('description', description);
        formData.append('photo', photo);

        try {
            // Send the PUT request to the correct API URL
            const response = await axios.put(`services/detail/${serviceId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle the response
            console.log(response.data);
            setServiceName('');
            setDescription('');
            setPhoto(null);
            setFile(null);

            // Update fetched data
            fetchDataUpdate();
            handleClose()
        } catch (error) {
            // Handle the error
            console.error(error);
        }
    };

    return (
        <>
            <ButtonToolbar>
                <Button type='link' size="md" onClick={() => handleOpen('md')}>
                    Edit
                </Button>
            </ButtonToolbar>
            <Modal size={size} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Update Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* start form */}
                    <div className='new'>
                        <div className='left'>
                            <img src={file ? URL.createObjectURL(file) : photo} alt='Uploaded' />
                        </div>
                        <div className='right'>
                            <form onSubmit={handleSubmit}>
                                <div className='all'>
                                    <div className='rowInput'>
                                        <FormControl variant='standard'>
                                            <label htmlFor='file'>
                                                Image:
                                                <DriveFolderUploadOutlined
                                                    style={{
                                                        fontSize: '3rem',
                                                        margin: '1rem 0 -1rem 0',
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            </label>
                                            <input type='file' id='file'
                                                onChange={handlePhoto}
                                                style={{ display: 'none' }}
                                            />
                                        </FormControl>
                                        <FormControl sx={{ m: 1, width: '25ch', marginLeft: '3rem' }} variant='standard'>
                                            <InputLabel htmlFor='standard-adornment-text'>Service Name</InputLabel>
                                            <Input
                                                type='text'
                                                required
                                                name='service_name'
                                                placeholder='Service Name'
                                                value={service_name}
                                                onChange={(e) => setServiceName(e.target.value)}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className='rowInput' style={{ marginTop: '1.5rem' }}>
                                        <TextField
                                            required
                                            fullWidth
                                            name='description'
                                            label='Service Description'
                                            multiline
                                            rows={4}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* end form */}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSubmit} >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditService;
