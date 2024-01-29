import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ImageList, ImageListItem } from '@mui/material';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Flex, Tooltip } from 'antd';
import FormControl from '@mui/material/FormControl';
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import { createDestinationPhoto, deleteDestinationArea, deleteDestinationPhoto, fetchDestinationAreaById, fetchDestinationsPhotos } from '../../../../api/DestinationAPI';
import EditArea from './EditArea';
import { Panel } from 'rsuite';



export default function ViewDestination() {

    const { id } = useParams();
    const [destinationID, setDestinationID] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [file, setFile] = useState(null)
    const [photo, setPhoto] = useState(null);
    const { confirm } = Modal;
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Fetch data by ID initially
    const { data: destinationData } = useQuery(['destinationData', id], () => fetchDestinationAreaById(id));
    const { data: destinationPhotos, isLoading, isError } = useQuery('destinationPhotos', fetchDestinationsPhotos);

    console.log(destinationData)

    const deletePhotoMutation = useMutation(() => deleteDestinationPhoto(destinationID), {
        onSuccess: () => {
            queryClient.invalidateQueries('destinations'); // Refresh the task list after deleting a task
        },
    });

    const deleteAreaMutation = useMutation(() => deleteDestinationArea(destinationID), {
        onSuccess: () => {
            queryClient.invalidateQueries('destinations'); // Refresh the task list after deleting a task
        },
    });

    const createTaskMutation = useMutation(createDestinationPhoto, {
        onSuccess: () => {
            queryClient.invalidateQueries('destinationPhoto'); // Refresh the task list after creating a new task
        },
    });


    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error loading tasks</div>;


    // Delete
    const showDeleteConfirmPhoto = () => {

        //confirm modal
        confirm({
            title: 'Are you sure delete this Destination?',
            icon: <ExclamationCircleFilled />,
            content: 'Once you click "Yes" the Destination Photo will be completelly delete',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                deletePhotoMutation.mutate();
                fetchDestinationsPhotos()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const showDeleteConfirmArea = () => {

        //confirm modal
        confirm({
            title: 'Are you sure delete this Destination?',
            icon: <ExclamationCircleFilled />,
            content: 'Once you click "Yes" the Destination Area will be completelly delete',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                deleteAreaMutation.mutate();
                navigate('/adminDestination')
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
            formData.append('destinationArea', destinations);

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

            {destinationData && (
                <>
                    <Panel>
                        <div className='row'>
                            <div className='col-md-8'>
                                <h3 className='py-2'>{destinationData.title}</h3>
                            </div>
                            <div className='col-md-4 py-3'>
                                <div className='row'>
                                    <Flex gap="small" vertical>
                                        <Flex wrap="wrap" gap="small">
                                            <Tooltip title="Edit">
                                                <Button
                                                    type="primary"
                                                    shape="circle">
                                                    <EditArea destinationId={destinationData.id} />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <Button
                                                    shape="circle"
                                                    danger icon={<DeleteIcon />}
                                                    onClick={() => {
                                                        setDestinationID(destinationData?.id);
                                                        showDeleteConfirmArea();
                                                    }}
                                                />
                                            </Tooltip>
                                        </Flex>
                                    </Flex>
                                </div>
                            </div>
                        </div>
                        <div className='py-2' style={{ marginLeft: '2rem' }}>
                            <div className='py-2'>
                                <h5>Description</h5>
                                <p style={{ margin: '.5rem' }}>
                                    {destinationData.longDescription}
                                </p>
                            </div>
                            <div className='py-2'>
                                <h5>Destination Price: {destinationData.price}</h5>
                            </div>

                        </div>
                        <div>
                            <ImageList sx={{ width: 1055 }}>
                                <ImageListItem key="Subheader" cols={8}>
                                    <ListSubheader component="div">
                                        <h5>
                                            {destinationData.title} Photo List
                                        </h5>

                                        <FormControl variant="standard">
                                            <label htmlFor='file'
                                                onClick={() => {
                                                    setDestinations(destinationData?.id)
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

                                {destinationPhotos?.map((item) => (
                                    (destinationData?.id === item?.destinationArea) ? (
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
                                                            setDestinationID(item?.id);
                                                            showDeleteConfirmPhoto();
                                                            navigate('/destination')
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
                    </Panel>
                </>

            )}
        </>
    )
}
