import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Panel, Form, Stack } from 'rsuite';
import { Upload } from 'antd';
import { FormControl, Input } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import axios from '../../../api/axios';
import { Select } from 'antd';
import '../Auth.scss'
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Spin } from 'antd';
import AuthContext from '../../../context/AuthProvider';


const { Option } = Select;

export default function TechicianForm() {
    const [skills, setSkills] = useState('');
    const [serviceRequist, setServiceRequist] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [coordinates, setCoordinates] = useState(null);
    const [dataLoading, setDataLoading] = useState(false);
    const [location, setLocation] = useState('');
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [userId, setUserId] = useState();
    const natigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const { user_id } = auth;


    // check user_id of logIn user
    useEffect(() => {
        setUserId(user_id);
    }, [user_id]);
    // console.log("this is user id "+ userId)

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    // const onFinishFetchLocation = async (event) => {
    //     event.preventDefault();
    //     try {
    //         setDataLoading(true);
    //         const response = await axios.get(
    //             `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&bounded=1&viewbox=39.0131,-6.6466,39.5619,-6.0649`
    //         );
    //         const responseData = response.data;
    //         if (responseData.length > 0) {
    //             const { lat, lon } = responseData[0];
    //             setLongitude(parseFloat(lon));
    //             setLatitude(parseFloat(lat));
    //             setCoordinates({ latitude: lat, longitude: lon });
    //             console.log('Location information found');
    //             message.success('Location information found');
    //         } else {
    //             setCoordinates(null);
    //             console.log('Location information not found');
    //             message.error(
    //                 'Location information not found, try to enter a popular location near where you are'
    //             );
    //         }
    //     } catch (error) {
    //         console.log('Error:', error);
    //         console.log('An error occurred while fetching location information');
    //         message.error('An error occurred while fetching location information');
    //     } finally {
    //         const minimumLoadingTime = 1000;
    //         setTimeout(() => {
    //             setDataLoading(false);
    //         }, minimumLoadingTime);
    //     }
    // };

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
                        message.success('Location information found');
                    } else {
                        setCoordinates(null);
                        console.log('Location information not found');
                        message.error(
                            'Location information not found. Please make sure you have enabled location access in your browser settings.'
                        );
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


    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedYearValue, setSelectedYearValue] = useState('');
    const [selectedServiceValue, setSelectedServiceValue] = useState('');


    const handleService = (value) => {
        console.log(`selected ${value}`);
        setSelectedServiceValue(value);
    };

    const handleYear = (value) => {
        console.log(`selected ${value}`);
        setSelectedYearValue(value);
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('services/');
                const serviceOptions = response.data
                    .map((service) => {
                        return {
                            value: service.id,
                            label: service.service_name,
                        };
                    })
                    .filter(Boolean);
                setOptions(serviceOptions);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    // const [file, setFile] = useState(null);
    // const handleFileChange = (event) => {
    //     setSelectedFile(event.target.files[0]);
    // };

    const years = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];


    const handleFileChanges = ({ fileList }) => {
        setFileList(fileList);
        console.log(`selected ${fileList}`);

    };
    
    // const beforeUploadData = (file) => {
    //     const isPDF = file.type === 'application/pdf';
    //     const isLt1M = file.size / 1024 / 1024 <= 1;

    //     if (!isPDF) {
    //         message.error('You can only upload PDF files!');
    //     }

    //     if (!isLt1M) {
    //         message.error('File size must be less than or equal to 1MB!');
    //     }

    //     return isPDF && isLt1M;
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const point = `POINT (${latitude} ${longitude})`;

        // Prepare the data to be sent in the request
        const formData = new FormData();
        formData.append('skills', skills);
        formData.append('service', selectedServiceValue);
        formData.append('experience_years', selectedYearValue);
        formData.append('location', point);
        formData.append('techUser', userId);
        fileList.forEach((file) => {
            formData.append('certificates', file);
        });

        try {

            if (longitude === null || latitude === null) {
                message.error('You have to test your location before submition');

            } else {

                // Send the request using axios
                const response = await axios.post('technicians/criterial/create', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // Handle the response
                console.log('Form submission response:', response.data);
                // Reset the form fields if needed
                setSkills('');
                setSelectedServiceValue('');
                setSelectedYearValue('');
                setLocation('');
                setFileList([]);
                setLongitude(null);
                setLatitude(null);
                message.success('Form submitted successfully');
                natigate('/login')
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            message.error('An error occurred while submitting the form');
        }
    };

    return (
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{
                height: '100%',
                width: '100%',
            }}
        >
            <div className="panel">
                <Panel
                    header={
                        <span
                            style={{
                                textAlign: 'center',
                                fontSize: '1.5rem',
                                alignContent: 'center',
                                display: 'flex',
                                marginTop: '2rem',
                                alignItems: 'center',
                                marginLeft: '1rem',
                            }}
                        >
                            Here we go complete registration
                        </span>
                    }
                    bordered
                    style={{
                        background: '#fff',
                        width: '100%',
                        marginTop: '1.5rem',
                        marginBottom: '2rem',
                    }}
                >
                    <p>
                        <span>Kandly fill up the form to provide your technical approval</span>
                    </p>
                    <br />
                    <hr style={{ border: '0.12rem solid rgb(173, 169, 169)', color: 'blue' }} />
                    <Form method="post" enctype="multipart/form-data">
                        <label>Technical Information:</label>
                        <div className="row d-flex">
                            <div className="col-md-5">
                                <FormControl sx={{ m: 0.5, width: '30ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-text">skills</InputLabel>
                                    <Input
                                        autoFocus
                                        required="true"
                                        type="text"
                                        name="skills"
                                        value={skills}
                                        onChange={(e) => setSkills(e.target.value)}
                                    />
                                </FormControl>
                            </div>

                            <div className="col-md-4">
                                <label>Service:</label>
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select a service"
                                    optionFilterProp="children"
                                    value={selectedServiceValue}
                                    onChange={handleService}
                                    onSearch={onSearch}
                                    loading={loading}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {options.map((service) => (
                                        <Option key={service.value} value={service.value}>
                                            {service.label}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div className="col-md-3">
                                <label>experience_years:</label>
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="Select a year"
                                    value={selectedYearValue}
                                    onChange={handleYear}
                                >
                                    {years.map((year) => (
                                        <Option key={year} value={year}>
                                            {year}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <div className="row py-3 d-flex">
                            <label>Other Information:</label>
                            <div className="col-md-5 py-4">
                                <label>Certificates & Cvs:</label>
                                <br />
                                <Upload
                                    multiple={true}
                                    fileList={fileList}
                                    listType='file'
                                    accept='.pdf'
                                    onChange={handleFileChanges}
                                    beforeUpload={(fileList) => {
                                        console.log({ fileList });
                                        return false;
                                    }
                                    }
                                >
                                    <Button icon={<UploadOutlined />}>Select Files</Button>
                                </Upload>
                            </div>

                            <div className="col-md-4">
                                <FormControl sx={{ m: 0.5, width: '30ch' }} variant="standard">
                                    {/* <InputLabel htmlFor="standard-adornment-text">
                                        Enter Location */}
                                        {dataLoading && <Spin />}
                                    {/* </InputLabel>
                                    <Input id="location" value={location} required="true" onChange={handleLocationChange} /> */}
                                    <Button onClick={onFinishFetchLocation} icon={<UploadOutlined />}>
                                        Test Location Availability
                                    </Button>
                                </FormControl>
                            </div>
                        </div>
                        <div className="row d-flex">
                            <label>If you have additional service you can send a request:</label>
                            <div className="col-md-7">
                                <FormControl sx={{ width: '33ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-text">You can request new service</InputLabel>
                                    <Input
                                        type="text"
                                        name="service"
                                        value={serviceRequist}
                                        onChange={(e) => setServiceRequist(e.target.value)}
                                    />
                                    <Button icon={<UploadOutlined />}>Send Additional service request</Button>
                                </FormControl>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-end">
                                <Button htmlType="submit" type="primary" disabled={uploading} onClick={handleSubmit}>
                                    {uploading ? 'Uploading...' : 'Submit'}
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Panel>
            </div>
        </Stack>
    );
}
