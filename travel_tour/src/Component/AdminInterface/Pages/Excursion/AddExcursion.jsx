import React, { useState, useEffect, useContext } from 'react'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import { Modal, ButtonToolbar } from 'rsuite';
import { useMutation, useQueryClient } from 'react-query';
import { createExcursion } from '../../../../api/ExcursionAPI';
import AuthContext from '../../../../context/AuthProvider';


export default function AddExcursion() {

    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState();
    const handleOpen = value => {
        setSize(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const [file, setFile] = useState(null)
    const [longDescription, setLongDescription] = useState('');
    const [inclusion, setInclusion] = useState('');
    const [highlight, setHighlight] = useState('');
    const [exclusion, setExclusion] = useState('');
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const { auth, setAuth } = useContext(AuthContext);
    const { user_id } = auth;

    const queryClient = useQueryClient();

    const createTaskMutation = useMutation(createExcursion, {
        onSuccess: () => {
            queryClient.invalidateQueries('excursion'); // Refresh the task list after creating a new task
        },
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('price', price);
            formData.append('highlight', highlight);
            formData.append('inclusion', inclusion);
            formData.append('exclusion', exclusion);
            formData.append('longDescription', longDescription);
            formData.append('users', user_id);

            // Set loading to true during the mutation
            createTaskMutation.mutate(formData);

            // Reset the form fields upon successful mutation
            setTitle('');
            setPrice('');
            setLongDescription('');
            setExclusion('');
            setInclusion('');
            setHighlight('');

        } catch (error) {
            // Handle error here (e.g., show an error message to the user)
            console.error('Error creating task:', error);
        }
    };


    return (
        <>
            <ButtonToolbar>
                <Button size="md" onClick={() => handleOpen('md')}>
                    Add New Excursion
                </Button>
            </ButtonToolbar>
            <Modal size={size} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add Excursion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* start form */}
                    <div className='new'>
                        <div className='right'>
                            <form onSubmit={handleSubmit}>
                                <div className='all'>
                                    <div className='rowInput'>
                                        <FormControl sx={{ m: 1, width: '25ch', marginTop: '-2rem' }} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-text">Title</InputLabel>
                                            <Input
                                                type="text"
                                                required='true'
                                                name="tilte"
                                                placeholder='Tour Title'
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </FormControl>
                                        <FormControl sx={{ m: 1, width: '25ch', marginTop: '-2rem' }} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-text">Price</InputLabel>
                                            <Input
                                                type="text"
                                                required='true'
                                                name="price"
                                                placeholder='Tour Price'
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </FormControl>
                                    </div>

                                    <div className='rowInput' style={{ marginTop: '1.5rem' }}>
                                        <TextField
                                            required='true'
                                            fullWidth
                                            label="Tour Description"
                                            multiline
                                            rows={4}
                                            value={longDescription}
                                            onChange={(e) => setLongDescription(e.target.value)}
                                        />
                                    </div>

                                    <div className='rowInput' style={{ marginTop: '1.5rem' }}>
                                        <TextField
                                            required='true'
                                            fullWidth
                                            label="Tour highlights"
                                            multiline
                                            rows={2}
                                            value={highlight}
                                            onChange={(e) => setHighlight(e.target.value)}
                                        />
                                    </div>

                                    <div className='rowInput' style={{ marginTop: '1rem' }}>
                                        <div className='row py-2'>
                                            <div className='col-md-6'>
                                                <TextField
                                                    required='true'
                                                    fullWidth
                                                    label="Tour inclusion"
                                                    multiline
                                                    rows={2}
                                                    value={inclusion}
                                                    onChange={(e) => setInclusion(e.target.value)}
                                                />
                                            </div>
                                            <div className='col-md-6'>
                                                <TextField
                                                    required='true'
                                                    fullWidth
                                                    label="Tour exclusion"
                                                    multiline
                                                    rows={2}
                                                    value={exclusion}
                                                    onChange={(e) => setExclusion(e.target.value)}
                                                />
                                            </div>
                                        </div>
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
