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
import { updateExcursion, fetchExcursionById } from '../../../../api/ExcursionAPI';
import AuthContext from '../../../../context/AuthProvider';

export const EditExcursion = ({ excursionId }) => {
    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState();
    const handleOpen = (value) => {
        setSize(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [shotDescription, setShotDescription] = useState('');
    const { auth, setAuth } = useContext(AuthContext);
    const [inclusion, setInclusion] = useState('');
    const [highlight, setHighlight] = useState('');
    const [exclusion, setExclusion] = useState('');
    const { user_id } = auth;
    const queryClient = useQueryClient();

    // Fetch data by ID initially
    const { data: excursionData } = useQuery(['excursion', excursionId], () => fetchExcursionById(excursionId));

    // Set form fields with data fetched by ID
    useEffect(() => {
        if (excursionData) {
            setTitle(excursionData.title);
            setShotDescription(excursionData.shotDescription);
            setLongDescription(excursionData.longDescription);
            setPrice(excursionData.price);
        }
    }, [excursionData]);

    const updateExcursionMutation = useMutation(
        (updatedExcursion) => updateExcursion(excursionId, updatedExcursion),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('excursion');
            },
        }
    );


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare the form data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('longDescription', longDescription);
        formData.append('highlight', highlight);
        formData.append('inclusion', inclusion);
        formData.append('exclusion', exclusion);
        formData.append('users', user_id);


        // Use a try-catch block to handle errors
        try {
            // Reset previous errors
            updateExcursionMutation.reset();

            // Mutate with FormData
            await updateExcursionMutation.mutateAsync(formData);

            // Close the modal after successful update
            handleClose();
        } catch (error) {
            console.error('Error updating excursion:', error);
        }
    };

    return (
        <>
            <ButtonToolbar>
                <EditIcon onClick={() => handleOpen('md')} />
            </ButtonToolbar>
            <Modal size={size} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Update Excursion</Modal.Title>
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
                    <Button onClick={handleSubmit}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditExcursion;
