import React, { useState, useEffect } from 'react'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import axios from '../../../../api/axios';
import { Modal, ButtonToolbar } from 'rsuite';
import { useMutation, useQueryClient } from 'react-query';
import { createDestinationArea } from '../../../../api/DestinationAPI';


export default function AddArea({areId}) {

    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();
    const handleOpen = value => {
        setSize(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const [file, setFile] = useState(null)
    const [photo, setPhoto] = useState(null);
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [shotDescription, setShotDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');

    const queryClient = useQueryClient();

    const createTaskMutation = useMutation(createDestinationArea, {
        onSuccess: () => {
            queryClient.invalidateQueries('area'); // Refresh the task list after creating a new task
        },
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('price', price);
            formData.append('shotDescription', shotDescription);
            formData.append('longDescription', longDescription);
            formData.append('photo', photo);
            formData.append('destination', areId);

            // Set loading to true during the mutation
            createTaskMutation.mutate(formData);

            // Reset the form fields upon successful mutation
            setTitle('');
            setPrice('');
            setLongDescription('')
            setShotDescription('')
            setPhoto(null); // Reset file input

        } catch (error) {
            // Handle error here (e.g., show an error message to the user)
            console.error('Error creating task:', error);
        }
    };



    const handlePhoto = (e) => {
        setFile(e.target.files[0])
        setPhoto(e.target.files[0]);
        console.log(e.target.files[0])
    }

    return (
        <>
            <ButtonToolbar>
                <Button
                    type="primary"
                    size="md" onClick={() => handleOpen('md')}>
                    Add Destination Area
                </Button>
            </ButtonToolbar>
            <Modal size={size} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add Area</Modal.Title>
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
                                        
                                        <FormControl sx={{ m: 1, width: '17ch', marginLeft: '2rem' }} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-text">Title</InputLabel>
                                            <Input
                                                type="text"
                                                required='true'
                                                name="tilte"
                                                placeholder='Area Title'
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </FormControl>

                                        <FormControl sx={{ m: 1, width: '17ch', marginLeft: '2rem' }} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-text">Price</InputLabel>
                                            <Input
                                                type="text"
                                                required='true'
                                                name="price"
                                                placeholder='Area Price'
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </FormControl>

                                    </div>
                                    {/* <div className='rowInput' style={{ marginTop: '1.5rem' }}>
                                        <TextField
                                            required='true'
                                            fullWidth
                                            label="Area Description"
                                            multiline
                                            rows={3}
                                            value={shotDescription}
                                            onChange={(e) => setShotDescription(e.target.value)}
                                        />
                                    </div> */}
                                    <div className='rowInput' style={{ marginTop: '1.5rem' }}>
                                        <TextField
                                            required='true'
                                            fullWidth
                                            label="Area Description"
                                            multiline
                                            rows={8}
                                            value={longDescription}
                                            onChange={(e) => setLongDescription(e.target.value)}
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
