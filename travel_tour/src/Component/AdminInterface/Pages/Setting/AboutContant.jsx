import React, { useState, useEffect, useContext } from 'react'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import axios from '../../../../api/axios';
import { Modal, ButtonToolbar } from 'rsuite';
import { createAbout } from '../../../../api/AboutAPI';
import { useMutation, useQueryClient } from 'react-query';
import AuthContext from '../../../../context/AuthProvider';

export default function AboutContant() {

    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();
    const [userRole, setUserRole] = useState('');
    const handleOpen = value => {
        setSize(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const { auth, setAuth } = useContext(AuthContext);
    const { role, user_id } = auth;

    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');

    // Fetch

    const queryClient = useQueryClient();

    const createTaskMutation = useMutation(createAbout, {
        onSuccess: () => {
            queryClient.invalidateQueries('about'); // Refresh the task list after creating a new task
        },
    });

    // End of Fetch


    const handleSubmit = async (event) => {
        event.preventDefault();

        const users = user_id;
        createTaskMutation.mutate({
            title,
            subtitle,
            description,
            users,
        });

        try {
            // Send the POST request

            // Handle the response
            setTitle('');
            setSubtitle('');
            setDescription('');

        } catch (error) {
            // Handle the error
            console.error(error);
        }
        handleClose()
    };





    return (
        <>
            <ButtonToolbar>
                <Button type='link' size="md" onClick={() => handleOpen('md')}>
                    Control About Contant
                </Button>
            </ButtonToolbar>
            <Modal size={size} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add Post</Modal.Title>
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
                    <Button onClick={handleSubmit} >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
