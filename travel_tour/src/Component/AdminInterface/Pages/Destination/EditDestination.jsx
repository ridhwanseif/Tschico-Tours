import React, { useState, useEffect, useContext } from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import { Modal, ButtonToolbar } from 'rsuite';
import EditIcon from '@mui/icons-material/Edit';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { updateDestination, fetchDestinationById } from '../../../../api/DestinationAPI';
import AuthContext from '../../../../context/AuthProvider';

export const EditDestination = ({ destinationId }) => {
    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState();
    const handleOpen = (value) => {
        setSize(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const [file, setFile] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const { auth, setAuth } = useContext(AuthContext);
    const { user_id } = auth;
    const queryClient = useQueryClient();

    // Fetch data by ID initially
    const { data: destinationData } = useQuery(['destination', destinationId], () => fetchDestinationById(destinationId));

    // Set form fields with data fetched by ID
    useEffect(() => {
        if (destinationData) {
            setTitle(destinationData.title);
            setDescription(destinationData.description);
            setPhoto(destinationData.photo);
        }
    }, [destinationData]);

    const updateDestinationMutation = useMutation(
        (updatedDestination) => updateDestination(destinationId, updatedDestination),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('destination');
            },
        }
    );


    const handlePhoto = (e) => {
        setFile(e.target.files[0]);
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare the form data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('users', user_id);

        if (photo instanceof File) {
            formData.append('photo', photo);
        }

        // Use a try-catch block to handle errors
        try {
            // Reset previous errors
            updateDestinationMutation.reset();

            // Mutate with FormData
            await updateDestinationMutation.mutateAsync(formData);

            // Close the modal after successful update
            handleClose();
        } catch (error) {
            console.error('Error updating destination:', error);
        }
    };

    return (
        <>
            <ButtonToolbar>
                <EditIcon onClick={() => handleOpen('md')} />
            </ButtonToolbar>
            <Modal size={size} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Update Destination</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* start form */}
                    <div className='new'>
                        <div className='left'>
                            <img
                                src={
                                    file
                                        ? URL.createObjectURL(file)
                                        : destinationData?.photo
                                            ? destinationData.photo
                                            : null
                                }
                                alt="Destination Image"
                            />
                        </div>
                        <div className='right'>
                            <form onSubmit={handleSubmit}>
                                <div className='all'>
                                    <div className='rowInput'>
                                        <input
                                            type='file'
                                            id='file'
                                            onChange={handlePhoto}
                                            style={{ display: 'none' }}
                                        />
                                        <label htmlFor='file'>
                                            <DriveFolderUploadOutlined
                                                style={{
                                                    fontSize: '3rem',
                                                    margin: '1rem 1rem -1.5rem 0',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        </label>
                                        <FormControl variant='standard'>
                                            <InputLabel htmlFor='standard-adornment-text'>
                                                Title
                                            </InputLabel>
                                            <Input
                                                type='text'
                                                required='true'
                                                name='tilte'
                                                placeholder='Destination Title'
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </FormControl>

                                    </div>
                                    <div className='rowInput' style={{ marginTop: '1.5rem' }}>
                                        <TextField
                                            required='true'
                                            fullWidth
                                            label='Destination Description'
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
                    <Button onClick={handleSubmit}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditDestination;
