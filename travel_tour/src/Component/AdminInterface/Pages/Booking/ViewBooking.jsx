import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Modal, ButtonToolbar } from 'rsuite';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { updateBooking, fetchBookingById } from '../../../../api/BookingAPI';
import { createNotification } from '../../../../api/NotificationAPI';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { SearchOutlined } from '@ant-design/icons';
import { Flex, Tooltip } from 'antd';

export const ViewBooking = ({ bookingId }) => {
    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState();
    const handleOpen = (value) => {
        setSize(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [status, setStatus] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [content, setContent] = useState('congratulations, order is accepted by technician, please provide feedback when it is complete');
    const queryClient = useQueryClient();

    // Fetch data by ID initially
    const { data: bookingData } = useQuery(['booking', bookingId], () => fetchBookingById(bookingId));
    const formattedRegDate = new Date(bookingData?.order_date).toLocaleString();
    
    const createTaskMutation = useMutation(createNotification, {
      onSuccess: () => {
        queryClient.invalidateQueries('notification'); // Refresh the task list after creating a new task
      },
    });

    // console.log(bookingId)
    // Set form fields with data fetched by ID
    useEffect(() => {
        if (bookingData) {
            setStatus(bookingData.status);
            setEmail(bookingData.email);
            setFirstName(bookingData.firstName);
            setLastName(bookingData.lastName);
            setOrderDate(bookingData.order_date)
        }
    }, [bookingData]);

    const updateBookingMutation = useMutation(
        (updatedBooking) => updateBooking(bookingId, updatedBooking),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('booking');
            },
        }
    );

    const handleNatification = async () => {
    
        // Format the selectedDate in the desired format
    
        try {
          const formData = new FormData();
          formData.append('notificationStatus', 'unreceived');
          formData.append('content', content);
          formData.append('booking', bookingData.id);
          formData.append('email', bookingData.email);

          
    
          // Set loading to true during the mutation
          createTaskMutation.mutate(formData);
    
          // Reset the form fields upon successful mutation
          setStatus('Unreceived');
          setContent('');
    
    
        } catch (error) {
          // Handle error here (e.g., show an error message to the user)
          console.error('Error creating task:', error);
        }
      };

    const handleAccept = async (event) => {
        event.preventDefault();

        // Prepare the form data
        const formData = new FormData();
        formData.append('email', email);
        formData.append('order_date', orderDate)

        setContent('Your booking is accepted our  for more information contact us ver email');

        if (status === 'incomplete') {
            formData.append('status', 'pending')
        }
        else if (status === 'pending') {
          alert("you have alredy accept this order");
        }
        else {
          alert("it's complete order");
        }

        // Use a try-catch block to handle errors
        try {
            // Reset previous errors
            updateBookingMutation.reset();

            // Mutate with FormData
            await updateBookingMutation.mutateAsync(formData);

            handleNatification();

            // Close the modal after successful update
            handleClose();
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    const handleReject = async (event) => {
        event.preventDefault();

        // Prepare the form data
        const formData = new FormData();
        formData.append('email', email);
        formData.append('order_date', orderDate)


        if (status === 'incomplete' || status === 'pending') {
            formData.append('status', 'rejected')
        }
        else if (status === 'pending') {
          alert("you have alredy accept this order");
        }
        else {
          alert("it's complete order");
        }

        // Use a try-catch block to handle errors
        try {
            // Reset previous errors
            updateBookingMutation.reset();

            // Mutate with FormData
            await updateBookingMutation.mutateAsync(formData);

            // Close the modal after successful update
            handleClose();
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    

    return (
        <>
            <ButtonToolbar>
                <Button
                    onClick={() => handleOpen('md')}
                    type="link"
                    shape="circle"
                    icon={<VisibilityOutlinedIcon />}
                />
            </ButtonToolbar>
            <Modal size={size} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Booking Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Flex horizontal gap="large" className='mb-1'>
                        <Flex gap="small">
                            <h6>Full Name: </h6>  {bookingData?.firstName} {bookingData?.lastName}
                        </Flex>
                        <Flex gap="small">
                            <h6>Email:</h6> {bookingData?.email}
                        </Flex>
                        <Flex gap="small">
                            <h6>Date:</h6> {formattedRegDate}
                        </Flex>
                    </Flex>
                    <Flex horizontal gap="large" className='py-2'>
                        <Flex gap="small">
                            <h6>PickUp Location:</h6> {bookingData?.pickUp_Location}
                        </Flex>
                        <Flex gap="small">
                            <h6>DropOff Location:</h6> {bookingData?.dropOff_Location}
                        </Flex>
                        <Flex gap="small">
                            <h6>Status:</h6> {bookingData?.status}
                        </Flex>
                    </Flex>
                    <Flex horizontal gap="large" className='py-2'>
                        <Flex gap="small">
                            <h6>Description: </h6> {bookingData?.description}
                        </Flex>
                    </Flex>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='m-1' onClick={handleReject}>Reject</Button>
                    <Button className='m-1' onClick={handleAccept}>Accept</Button>
                </Modal.Footer>
            </Modal >
        </>
    );
};

export default ViewBooking;
