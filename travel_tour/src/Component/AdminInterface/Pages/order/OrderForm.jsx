import React, { useState, useEffect, useContext } from 'react';
import { FormControl } from '@mui/material';
import axios from '../../../../api/axios';
import { UploadOutlined } from '@ant-design/icons';
import { Alert, Button, Input, message, Spin } from 'antd';
import AuthContext from '../../../../context/AuthProvider';
import { DatePicker, Select, Space, TimePicker } from 'antd';
import SendIcon from '@mui/icons-material/Send';
import { Modal, ButtonToolbar, Placeholder } from 'rsuite';


export default function OrderForm({ tech_id, marker_id }) {

    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState();
    const handleOpen = value => {
        setSize(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const { TextArea } = Input;
    const [type, setType] = useState('time');
    const { Option } = Select;
    const [customerEmail, setCustomerEmail] = useState('');
    const [techSkills, setTechSkills] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [techService, setTechService] = useState('');
    const [techServiceId, setTechServiceId] = useState('');

    const [coordinates, setCoordinates] = useState(null);
    const [dataLoading, setDataLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [masage, setMasage] = useState('');
    const [cutomerById, setCustomerById] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const { auth } = useContext(AuthContext);
    const { user_id, customer_id } = auth;
    const [status, setStatus] = useState('Unreceived');
    const [content, setContent] = useState('Hi, i ask for your Technician support');


    const SendNotification = async () => {

        // Create a new notification object to send to the server
        const newNotification = {
            'status': status,
            'content': content,
            'techUser': tech_id
        };
        console.log(tech_id)
        try {
            // Perform the post request to the backend API endpoint using Axios
            const response = await axios.post('notification/create', newNotification);

            // Notification successfully created, do something with the response if needed
            console.log('Notification created:', response.data);

            // Clear the form fields after successful submission
            setStatus('Unreceived');
            setContent('');

        } catch (error) {
            console.error('Error creating notification:', error);
        }
    };



    // date and time
    const handleDateChange = (value) => {
        setSelectedDate(value);
    };


    // fetch Technician 
    useEffect(() => {
        fetchData();
    }, []);
    // console.log(tech_id)

    const fetchData = async () => {
        try {
            const response = await axios.get(`technicians/detail/${marker_id}/`);
            setTechService(response.data.service.service_name)
            setTechServiceId(response.data.service.id)
            console.log(response.data)

        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    };

    // fetch customer 
    useEffect(() => {
        fetchCustomer();
    }, []);

    const fetchCustomer = async () => {
        try {
            const customer = `user/detail/${user_id}/`;
            const response = await axios.get(customer);

            // Format the reg_date
            const formattedRegDate = new Date(response.data.reg_date).toLocaleString();

            // Update the reg_date value in the response data
            response.data.reg_date = formattedRegDate;

            setCustomerById(response.data)
            setCustomerEmail(response.data.email)
            setCustomerName(response.data.first_name + ' ' + response.data.mid_name + ' ' + response.data.last_name)
            // console.log('customer : ', response.data)

        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };


    // test Location


    const onFinishFetchLocation = async (event) => {
        event.preventDefault();
        try {
            setDataLoading(true);

            // Get user's current location using Geolocation API
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;

                    const response = await axios.get(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );

                    const responseData = response.data;
                    if (responseData) {
                        const { lat, lon } = responseData;
                        setLongitude(parseFloat(lon));
                        setLatitude(parseFloat(lat));
                        setCoordinates({ latitude: lat, longitude: lon });
                        console.log('Location information found');
                        // message.success('Location information found');
                        setMasage(<Alert type="success" message='Location information found.' banner />);
                    } else {
                        setCoordinates(null);
                        console.log('Location information not found');
                        setMasage(<Alert type="error" message='Location information not found.' banner />);

                        // message.error(
                        //     'Location information not found. Please make sure you have enabled location access in your browser settings.'
                        // );
                    }
                });
            } else {
                console.log('Geolocation is not supported by your browser');
                message.error('Geolocation is not supported by your browser');
            }
        } catch (error) {
            console.log('Error:', error);
            console.log('An error occurred while fetching location information');
            message.error('An error occurred while fetching location information');
        } finally {
            const minimumLoadingTime = 1000;
            setTimeout(() => {
                setDataLoading(false);
            }, minimumLoadingTime);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Format the selectedDate in the desired format
        const formattedDate = selectedDate ? selectedDate.format('YYYY-MM-DD HH:mm') : null;
        const point = `POINT (${latitude} ${longitude})`;

        // Prepare the data to be sent to the API
        const formData = new FormData();
        formData.append('order_date', formattedDate);
        formData.append('service', techServiceId);
        formData.append('description', description);
        formData.append('location', point);
        formData.append('customer', customer_id);

        try {
            if (longitude === null || latitude === null) {
                setMasage(<Alert
                    type="error"
                    message='You have to test your location before submition.'
                    banner
                />);

            } else {
                // Make a POST request to the API with form data
                const response = await axios.post('order-service/create', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('pass order')
                SendNotification();
                handleClose();

            }
        }
        catch (error) {
            console.error('API error: ', error);
            // Handle errors here
        };
    };



    return (

        <>
            <ButtonToolbar>

                <Button size="sm" onClick={() => handleOpen('md')}>
                    Click to Order
                </Button>

            </ButtonToolbar>
            <Modal size={size} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Make Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* start of body */}
                    <div className="container d-flex justify-content-end">

                        <div className='card-body'>
                            <form>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className="small mb-1" for="inputOrgName">Your Name:</label>
                                        <input
                                            className="form-control"
                                            id="inputOrgName" type="text"
                                            placeholder="Enter your organization name"
                                            value={customerName}
                                        />
                                    </div>


                                    <div className="col-md-5">
                                        <label className="small mb-1" for="inputLastName">Your Email:</label>
                                        <input
                                            className="form-control"
                                            id="inputLastName"
                                            type="text"
                                            placeholder="Technicaian Skill"
                                            value={customerEmail}
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <label className="small mb-1" for="inputLastName">Service you need:</label>
                                        <input
                                            className="form-control"
                                            id="inputLastName"
                                            type="text"
                                            placeholder="Service"
                                            value={techService} />
                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-5 py-3">
                                        <label className="small mb-1" for="inputLastName">Select Date and time:</label><br />
                                        <Space direction="vertical" size={12}>
                                            <DatePicker showTime onChange={handleDateChange} />
                                        </Space>
                                    </div>

                                    <div className="col-md-7 py-3">
                                        <label className="small mb-1" for="inputEmailAddress">Live description</label>
                                        <TextArea
                                            placeholder="Description"
                                            allowClear
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>

                                </div>

                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-10">
                                        <FormControl sx={{ width: '30ch' }} variant="standard">
                                            <Button onClick={onFinishFetchLocation} icon={<UploadOutlined />}>
                                                Test Location Availability
                                            </Button>
                                            {dataLoading &&
                                                <p>{masage}</p>}
                                        </FormControl>
                                    </div>

                                </div>

                            </form>

                        </div>
                    </div>
                    {/* end of body */}
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary"
                        onClick={handleSubmit}
                        icon={<SendIcon />}>
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
