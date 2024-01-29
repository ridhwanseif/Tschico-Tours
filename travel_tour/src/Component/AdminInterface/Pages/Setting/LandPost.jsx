import React, { useState, useEffect, useContext } from 'react'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import axios from '../../../../api/axios';
import { Modal, ButtonToolbar } from 'rsuite';
import { useMutation, useQueryClient } from 'react-query';
import { createPost } from '../../../../api/postAPI';
import AuthContext from '../../../../context/AuthProvider';


export default function LandPost() {

    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState();
    const handleOpen = value => {
        setSize(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const { auth, setAuth } = useContext(AuthContext);
    const { role, user_id } = auth;
    const [file, setFile] = useState(null)
    const [photo, setPhoto] = useState(null);
    const [description, setDescription] = useState('');
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
 
  
    const queryClient = useQueryClient();
  
    const createTaskMutation = useMutation(createPost, {
      onSuccess: () => {
        queryClient.invalidateQueries('post'); // Refresh the task list after creating a new task
      },
    });
      
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const formData = new FormData();
          formData.append('title', title);
          formData.append('subtitle', subtitle);
          formData.append('description', description);
          formData.append('photo', photo);
          formData.append('users', user_id);
    
          // Set loading to true during the mutation
          createTaskMutation.mutate(formData);
    
          // Reset the form fields upon successful mutation
          setTitle('');
          setSubtitle('');
          setDescription('');
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
                <Button type='link' size="md" onClick={() => handleOpen('md')}>
                    Add New Post
                </Button>
            </ButtonToolbar>
            <Modal size={size} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add Post</Modal.Title>
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
                                                placeholder='Post Title'
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </FormControl>
                                        <FormControl sx={{ m: 1, width: '17ch', marginLeft: '2rem' }} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-text">SubTitle</InputLabel>
                                            <Input
                                                type="text"
                                                required='true'
                                                name="subtilte"
                                                placeholder='Post SubTitle'
                                                value={subtitle}
                                                onChange={(e) => setSubtitle(e.target.value)}
                                            />
                                        </FormControl>

                                    </div>
                                    <div className='rowInput' style={{ marginTop: '1.5rem' }}>
                                        <TextField
                                            required='true'
                                            fullWidth
                                            label="Post Description"
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
