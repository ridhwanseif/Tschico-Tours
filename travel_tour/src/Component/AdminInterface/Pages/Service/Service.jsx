import React, { useState, useEffect, useContext } from 'react';
import './service.scss';
import { Descriptions, Input, Layout, Space, Tag, Pagination, Modal, Button, Card } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import SearchIcon from '@rsuite/icons/Search';
import { InputGroup } from 'rsuite';
import AddServiceForm from './AddServiceForm';
import axios from '../../../../api/axios';
import AuthContext from '../../../../context/AuthProvider';
import { Link } from 'react-router-dom';
import EditService from './EditService';

const { Meta } = Card;
const { Sider, Content } = Layout;
const { Search } = Input;

export const Service = () => {
    const [userRole, setUserRole] = useState('');
    const [services, setServices] = useState([]);
    const [serviceId, setServiceId] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const { confirm } = Modal;
    const { auth } = useContext(AuthContext);
    const { role } = auth;


    // check role of logIn user
    useEffect(() => {
        setUserRole(role);
    }, [role]);

    // Fetch
    const fetchData = async () => {
        try {
            const response = await axios.get('services');
            setServices(response.data.reverse());
            setServiceId(response.data.id)
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    useEffect(() => {

        fetchData();
    }, []);
    // End of Fetch

    // Delete
    const showDeleteConfirm = (id) => {

        const deleteService = async (id) => {
            try {
                const response = await axios.delete(`services/detail/${id}/`);
                console.log('Deleted resource:', response.data);
                fetchData();
            } catch (error) {
                console.error('Error deleting resource:', error);
            }
        };

        //confirm modal
        confirm({
            title: 'Are you sure delete this Service?',
            icon: <ExclamationCircleFilled />,
            content: 'Once you click "Yes" the service will be completelly delete',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                deleteService(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    // end Delete

    // Search
    const handleSearch = (value) => {
        setSearchValue(value);
        setCurrentPage(1);
    };

    const filteredServices = services.filter((service) =>
        service.service_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    // End of Search

    // Pagination
    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedServices = filteredServices.slice(startIndex, endIndex);
    const totalServices = filteredServices.length;
    const totalPages = Math.ceil(totalServices / pageSize);
    // End of Pagination

    return (

        <>
            <div className='top_header'>
                <div className='left'>
                    <span>List of Available Service.</span>
                </div>
                <div className='right'>
                    {userRole === 'admin' && (
                      <AddServiceForm />
                    )}

                </div>
            </div>

            {/* Search input */}
            <div className="search">
                <InputGroup style={{ width: 300, margin: 7 }}>
                    <Input
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(event) => handleSearch(event.target.value)}
                    />
                    <Button type="primary"
                        icon={<SearchIcon />}
                        onClick={() => handleSearch(searchValue)}
                        style={{
                            margin: '.1rem .2rem  .1rem .5rem'
                        }}
                    />

                </InputGroup>
            </div>


            {/* List of services */}
            {paginatedServices.map((service) => (
                <div key={service.id} className="service">
                    <div className="left">
                        <Card
                            style={{ width: 300 }}
                            cover={<img alt="example" src={service.photo} />}
                        >
                            <Meta title={service.service_name} />
                        </Card>
                    </div>
                    <div className="right">

                        <Descriptions title={service.service_name + " Information "}>
                            <Descriptions.Item label="Description">
                                {service.description}
                            </Descriptions.Item>
                        </Descriptions>

                        {userRole === 'admin' && 
                            <div className='row'
                                style={{ display: 'flex', justifyContent: 'right' }}
                            >
                                <div className='col-md-11 edit d-flex justify-content-end'>
                                    {/* <Link to={`edit/${service.id}`} elament={<EditService />}> */}

                                    <EditService
                                        serviceId={service.id}
                                    />

                                    {/* </Link> */}
                                </div>
                                <div className='col-md-1 edit d-flex justify-content-end'>
                                    <Button onClick={() => showDeleteConfirm(service.id)} type="link" danger>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            ))}
            {/* End of List of services */}

            {/* Pagination */}
            <div className="py-3 pagination-container d-flex justify-content-center">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalServices}
                    onChange={handleChangePage}
                    onShowSizeChange={handlePageSizeChange}
                    showSizeChanger
                    showQuickJumper
                    pageSizeOptions={['3', '6', '9']}
                />
            </div>
            {/* End of Pagination */}
        </>

    );
};

export default Service;
