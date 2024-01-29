import React, { useState, useEffect } from 'react'
import './service.scss'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import axios from '../../../../api/axios';
import { Modal, ButtonToolbar } from 'rsuite';

export default function AddServiceForm() {

    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState();
    const handleOpen = value => {
        setSize(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const [file, setFile] = useState(null)
    const [photo, setPhoto] = useState(null);
    const [service_name, setService_name] = useState('');
    const [description, setDescription] = useState('');
    const [services, setServices] = useState([]);
    const [error, setError] = useState('');

    // Fetch
    const fetchDataUpdate = async () => {
        try {
            const response = await axios.get('services');
            setServices(response.data.reverse());
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    useEffect(() => {

        fetchDataUpdate();
    }, []);
    // End of Fetch


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare the form data
        const formData = new FormData();
        formData.append('service_name', service_name);
        formData.append('description', description);
        formData.append('photo', photo);

        try {
            // Send the POST request
            const response = await axios.post('services/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Handle the response
            console.log(response.data);
            setService_name('');
            setDescription('');
            setPhoto(null);
            setFile(null);

            // Update fetched data
            fetchDataUpdate();
        } catch (error) {
            // Handle the error
            console.error(error);
        }
        handleClose()
    };



    const handlePhoto = (e) => {
        setFile(e.target.files[0])
        setPhoto(e.target.files[0]);
        console.log(e.target.files[0])

    }

    return (
        <>
            <ButtonToolbar>
                <Button type='link' size="md" onClick={() => handleOpen('md')}>
                    Add New
                </Button>
            </ButtonToolbar>
            <Modal size={size} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* start form */}
                    <div className='new'>
                        <div className='left'>
                            <img
                                src={
                                    file
                                        ? URL.createObjectURL(file)
                                        : null
                                }
                            />
                        </div>
                        <div className='right'>
                            <form onSubmit={handleSubmit}>
                                <div className='all'>

                                    <div className='rowInput'>

                                        <FormControl variant="standard">
                                            <label htmlFor='file'>
                                                Image:
                                                <DriveFolderUploadOutlined
                                                    style={{
                                                        fontSize: '3rem',
                                                        margin: '1rem 0 -1rem 0',
                                                        cursor: 'pointer'
                                                    }} />
                                            </label>
                                            <input
                                                type='file'
                                                id='file'
                                                onChange={handlePhoto}
                                                style={{ display: 'none' }} />
                                        </FormControl>
                                        <FormControl sx={{ m: 1, width: '25ch', marginLeft: '3rem' }} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-text">Service Name</InputLabel>
                                            <Input
                                                type="text"
                                                required='true'
                                                name="serciveName"
                                                placeholder='Service Name'
                                                value={service_name}
                                                onChange={(e) => setService_name(e.target.value)}
                                            />
                                        </FormControl>

                                    </div>
                                    <div className='rowInput' style={{ marginTop: '1.5rem' }}>
                                        <TextField
                                            required='true'
                                            fullWidth
                                            label="Service Description"
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
    )
}
