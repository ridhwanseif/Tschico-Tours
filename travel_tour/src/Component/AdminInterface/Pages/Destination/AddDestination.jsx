import React, { useState, useEffect, useContext } from 'react'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import { Modal, ButtonToolbar } from 'rsuite';
import { useMutation, useQueryClient } from 'react-query';
import { createDestination } from '../../../../api/DestinationAPI';
import AuthContext from '../../../../context/AuthProvider';


export default function AddDestination() {

    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState();
    const handleOpen = value => {
        setSize(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const [file, setFile] = useState(null)
    const [photo, setPhoto] = useState(null);
    const [description, setDescription] = useState('');
    const [destinations, setDestinations] = useState([]);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const { auth, setAuth } = useContext(AuthContext);
    const { user_id } = auth;
    
    const queryClient = useQueryClient();
  
    const createTaskMutation = useMutation(createDestination, {
      onSuccess: () => {
        queryClient.invalidateQueries('destination'); // Refresh the task list after creating a new task
      },
    });
      
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const formData = new FormData();
          formData.append('title', title);
          formData.append('description', description);
          formData.append('photo', photo);
          formData.append('users', user_id);
    
          // Set loading to true during the mutation
          createTaskMutation.mutate(formData);
    
          // Reset the form fields upon successful mutation
          setTitle('');
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
                <Button size="md" onClick={() => handleOpen('md')}>
                    Add New Destination
                </Button>
            </ButtonToolbar>
            <Modal size={size} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add Destination</Modal.Title>
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
                                            label="Destination Description"
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
