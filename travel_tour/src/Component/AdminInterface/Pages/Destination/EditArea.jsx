import React, { useState, useEffect } from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { Button, Upload } from 'antd';
import { Modal, ButtonToolbar } from 'rsuite';
import EditIcon from '@mui/icons-material/Edit';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { fetchDestinationAreaById, updateDestinationArea } from '../../../../api/DestinationAPI';

export const EditArea = ({ destinationId }) => {
    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState();
    const handleOpen = (value) => {
        setSize(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const [destination, setDestination] = useState([]);
    const [file, setFile] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [shotDescription, setShotDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const queryClient = useQueryClient();

    // Fetch data by ID initially
    const { data: destinationData } = useQuery(['destination', destinationId], () => fetchDestinationAreaById(destinationId));

    // Set form fields with data fetched by ID
    useEffect(() => {
        if (destinationData) {
            setTitle(destinationData.title);
            setPhoto(destinationData.photo);
            setLongDescription(destinationData.longDescription)
            setShotDescription(destinationData.shotDescription)
            setPrice(destinationData.price)
        }
    }, [destinationData]);

    const updateDestinationMutation = useMutation(
        (updatedDestination) => updateDestinationArea(destinationId, updatedDestination),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('destination');
            },
        }
    );

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare the form data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('shotDescription', shotDescription);
        formData.append('longDescription', longDescription);
        formData.append('destination', destination);
        formData.append('price', price);


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
                    <Modal.Title>Update Destination Area</Modal.Title>
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
                            <form >
                                <div className='all'>
                                    <div className='rowInput'>
                                        <Upload
                                            customRequest={({ file }) => {
                                                setFile(file);
                                                setPhoto(file);
                                            }}
                                            showUploadList={false}
                                            onChange={() => {
                                                setDestination(destinationData.destination)
                                            }}
                                        >
                                            <DriveFolderUploadOutlined
                                                style={{
                                                    fontSize: '3rem',
                                                    margin: '1rem 1rem -1.5rem 0',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        </Upload>
                                        <FormControl variant='standard' sx={{ m: 1, width: '17ch', marginLeft: '2rem' }}>
                                            <InputLabel htmlFor='standard-adornment-text'>
                                                Title
                                            </InputLabel>
                                            <Input
                                                type='text'
                                                required='true'
                                                name='tilte'
                                                placeholder='Destination Title'
                                                value={title}
                                                onChange={(e) => {
                                                    setTitle(e.target.value)
                                                    setDestination(destinationData.destination)
                                                }}
                                            />
                                        </FormControl>

                                        <FormControl variant='standard' sx={{ m: 1, width: '17ch', marginLeft: '2rem' }}>
                                            <InputLabel htmlFor='standard-adornment-text'>
                                                Price
                                            </InputLabel>
                                            <Input
                                                type='text'
                                                required='true'
                                                name='price'
                                                placeholder='Destination price'
                                                value={price}
                                                onChange={(e) => {
                                                    setPrice(e.target.value)
                                                    setDestination(destinationData.destination)
                                                }}
                                            />
                                        </FormControl>

                                    </div>
                                    {/* <div className='rowInput' style={{ marginTop: '1.5rem' }}>
                                        <TextField
                                            required='true'
                                            fullWidth
                                            label='Shot Description'
                                            multiline
                                            rows={3}
                                            value={shotDescription}
                                            onChange={(e) => {
                                                setShotDescription(e.target.value)
                                                setDestination(destinationData.destination)
                                            }}
                                        />
                                    </div> */}
                                    <div className='rowInput' style={{ marginTop: '1.5rem' }}>
                                        <TextField
                                            required='true'
                                            fullWidth
                                            label='Long Description'
                                            multiline
                                            rows={8}
                                            value={longDescription}
                                            onChange={(e) => {
                                                setLongDescription(e.target.value)
                                                setDestination(destinationData.destination)
                                            }}
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

export default EditArea;
