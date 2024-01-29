import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { createExcursionPhoto, deleteExcursionPhoto, fetchExcursionById, fetchExcursionsPhotos, updateExcursion } from '../../../../api/ExcursionAPI';
import { ImageList, ImageListItem } from '@mui/material';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DriveFolderUploadOutlined } from '@mui/icons-material';



export default function ViewExcursion() {

    const { id } = useParams();
    const [excursionID, setExcursionID] = useState([]);
    const [excursions, setExcursions] = useState([]);
    const [file, setFile] = useState(null)
    const [photo, setPhoto] = useState(null);
    const { confirm } = Modal;

    const queryClient = useQueryClient();

    // Fetch data by ID initially
    const { data: excursionData } = useQuery(['excursion', id], () => fetchExcursionById(id));
    const { data: excursionPhotos, isLoading, isError } = useQuery('excursionPhotos', fetchExcursionsPhotos);

    // console.log(excursions)

    const deleteTaskMutation = useMutation(() => deleteExcursionPhoto(excursionID), {
        onSuccess: () => {
            queryClient.invalidateQueries('excursions'); // Refresh the task list after deleting a task
        },
    });

    const createTaskMutation = useMutation(createExcursionPhoto, {
        onSuccess: () => {
            queryClient.invalidateQueries('excursionPhoto'); // Refresh the task list after creating a new task
        },
    });


    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error loading tasks</div>;


    // Delete
    const showDeleteConfirm = () => {

        //confirm modal
        confirm({
            title: 'Are you sure delete this Excursion?',
            icon: <ExclamationCircleFilled />,
            content: 'Once you click "Yes" the Excursion Photo will be completelly delete',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                deleteTaskMutation.mutate();
                fetchExcursionsPhotos()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    // end Delete


    const handleSubmit = async () => {
        // e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('image', photo);
            formData.append('excursions', excursions);

            // Set loading to true during the mutation
            createTaskMutation.mutate(formData);

            // Reset the form fields upon successful mutation
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

            {excursionData && (
                <>
                    <h3 className='py-2'>{excursionData.title}</h3>
                    <div className='py-2' style={{ marginLeft: '1rem' }}>
                       
                        <div className='py-2'>
                            <h5>Description</h5>
                            <p style={{ margin: '.5rem' }}>
                                {excursionData.longDescription}
                            </p>
                        </div>
                        <div className='py-2'>
                            <h5>highlight Description</h5>
                            <p style={{ margin: '.5rem' }}>
                                {excursionData.highlight}
                            </p>
                        </div>
                        <div className='py-2'>
                            <h5>Enclusion </h5>
                            <p style={{ margin: '.5rem' }}>
                                {excursionData.inclusion}
                            </p>
                        </div>
                        <div className='py-2'>
                            <h5>Exclusion</h5>
                            <p style={{ margin: '.5rem' }}>
                                {excursionData.exclusion}
                            </p>
                        </div>
                        <div className='py-2'>
                                <h5>Excursion Price: {excursionData.price}</h5>
                            </div>
                    </div>
                    <div>
                        <ImageList sx={{ width: 1075 }}>
                            <ImageListItem key="Subheader" cols={10}>
                                <ListSubheader component="div">
                                    <h5>
                                        {excursionData.title} Photo List
                                    </h5>

                                    <FormControl variant="standard">
                                        <label htmlFor='file'
                                            onClick={()=>{
                                                setExcursions(excursionData?.id)
                                            }}
                                        >
                                            Select a photo:
                                            <DriveFolderUploadOutlined
                                                style={{
                                                    fontSize: '2rem',
                                                    cursor: 'pointer'
                                                }} />
                                        </label>
                                        <input
                                            type='file'
                                            id='file'
                                            onChange={handlePhoto}
                                            style={{ display: 'none' }}
                                        />
                                    </FormControl><br />
                                    <Button
                                        size="md"
                                        onClick={() => {
                                            handleSubmit()
                                        }}
                                    >
                                        Click to Add
                                    </Button>
                                </ListSubheader>
                            </ImageListItem>

                            {excursionPhotos?.map((item) => (
                                (excursionData?.id === item?.excursions) ? (
                                // Use a ternary operator or conditional rendering to check the condition
                                    <ImageListItem key={item.id}>
                                        <img
                                            src={`${item.image}?w=248&fit=crop&auto=format`}
                                            alt="ERROR"
                                            loading="lazy"
                                        />
                                        <ImageListItemBar
                                            actionIcon={
                                                <IconButton
                                                    sx={{ color: 'red' }}
                                                    aria-label={`info about ${item.title}`}
                                                    onClick={() => {
                                                        setExcursionID(item?.id);
                                                        showDeleteConfirm();
                                                    }}
                                                >
                                                    <DeleteIcon color='red' />
                                                </IconButton>
                                            }
                                        />
                                    </ImageListItem>
                                ) : null
                            ))}

                        </ImageList>
                    </div>
                </>

            )}
        </>
    )
}
