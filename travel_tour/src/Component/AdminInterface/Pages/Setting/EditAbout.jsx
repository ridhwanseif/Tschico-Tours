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
import { updateAbout, fetchAboutById } from '../../../../api/AboutAPI';
import AuthContext from '../../../../context/AuthProvider';

export const EditAbout = () => {
    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState();
    const handleOpen = (value) => {
        setSize(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const { auth, setAuth } = useContext(AuthContext);
    const { role, user_id } = auth;
    const queryClient = useQueryClient();

    // Fetch data by ID initially
    const aboutId = 1;
    const { data: aboutData } = useQuery(['about', aboutId], () => fetchAboutById(aboutId));

    // Set form fields with data fetched by ID
    useEffect(() => {
        if (aboutData) {
            setTitle(aboutData.title);
            setSubtitle(aboutData.subtitle);
            setDescription(aboutData.description);
        }
    }, [aboutData]);

    const updateAboutMutation = useMutation(
        (updatedAbout) => updateAbout(aboutId, updatedAbout),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('about');
            },
        }
    );


   

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare the form data
        const users = user_id;
        updateAboutMutation.mutate({
            title,
            subtitle,
            description,
            users,
          });

        // Use a try-catch block to handle errors
        try {
            // Reset previous errors
            updateAboutMutation.reset();


            // Close the modal after successful update
            handleClose();
        } catch (error) {
            console.error('Error updating about:', error);
        }
    };

    return (
        <>
            <ButtonToolbar>
                <Button type='link' size="md" onClick={() => handleOpen('md')}>
                    Edit About Contant
                </Button>
            </ButtonToolbar>
            <Modal size={size} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Update About</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* start form */}
                    <div className='new'>

                        <div className='right'>
                            <form onSubmit={handleSubmit}>
                                <div className='all'>
                                    <FormControl sx={{ width: '30ch', marginTop: '-1.9rem' }} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-text">Title</InputLabel>
                                        <Input
                                            type="text"
                                            required='true'
                                            name="AboutTitle"
                                            placeholder='Title'
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '30ch', marginLeft: '1.9rem', marginTop: '-1.9rem' }} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-text">Sub Title</InputLabel>
                                        <Input
                                            type="text"
                                            required='true'
                                            name="AboutSubTitle"
                                            placeholder='SubTitle'
                                            value={subtitle}
                                            onChange={(e) => setSubtitle(e.target.value)}
                                        />
                                    </FormControl>

                                    <div className='rowInput' style={{ marginTop: '1.5rem' }}>
                                        <TextField
                                            required='true'
                                            fullWidth
                                            label="Post Description"
                                            multiline
                                            rows={6}
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

export default EditAbout;
