import React, { useState, useEffect, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import axios from '../../../../api/axios';
import AuthContext from '../../../../context/AuthProvider';
import ViewOnMap from './ViewOnMap';
import ViewAllOnMap from './ViewAllOnMap';



export const OrderTable = ({ tableTitle, rows, columns, addButton }) => {
    const { confirm } = Modal;
    // const [userRole, setUserRole] = useState('');
    const [orders, setOrders] = useState([]);
    const [customerId, setCustomerId] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { auth } = useContext(AuthContext);
    const [currentStatus, setCurrentStatus] = useState('');
    const { role } = auth;
    const navigate = useNavigate();
    const [count, setCount] = useState()

    // check role of logIn user
    // useEffect(() => {
    //     setUserRole(role);
    // }, [role]);


    const fetchData = async () => {
        try {
            const response = await axios.get('order-service');
            setCount(response.data.length);

            setOrders(response.data);
            setCustomerId(response.data.id)
            // console.log(response.data)
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    const showDeleteConfirm = (id) => {
        const deleteOrder = async (id) => {
            try {
                const response = await axios.delete(`order-service/${id}/`);
                console.log('Deleted resource:', response.data);
            } catch (error) {
                console.error('Error deleting resource:', error);
            }
        };

        confirm({
            title: 'Are you sure delete or cancel this order?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                deleteOrder(id);
                navigate('/order')
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    // Toggle visibility of order details block
    const handleViewOrder = (orderId) => {
        navigate(`ViewOnMap/${orderId}`)
        // if (selectedOrder && selectedOrder.id === orderId) {
        //     setSelectedOrder(null);
        // } else {
        //     const order = orders.find((order) => order.id === orderId);
        //     setCurrentStatus(order.status)
        //     // Format the reg_date
        //     const formattedRegDate = new Date(order.reg_date).toLocaleString();

        //     // Update the reg_date value in the response data
        //     order.reg_date = formattedRegDate;

        //     setSelectedOrder(order);
        // }
    };



    const getStatusLabel = (status) => {
        const statusMap = {
            'completed': {
                label: 'Completed',
                color: 'green',
            },
            'pending': {
                label: 'Pending',
                color: 'goldenrod',
            },
            'incomplete': {
                label: 'Incomplete',
                color: 'gray',
            },
            'rejected': {
                label: 'Rejected',
                color: 'red',
            },
        };

        // Check if the status exists in the statusMap, if yes, return the corresponding label and color
        if (statusMap.hasOwnProperty(status)) {
            return statusMap[status];
        }
        // else {
        //     // If the status doesn't exist in the statusMap, return a default label and color
        //     return {
        //         label: 'Unknown',
        //         color: 'black',
        //     };
        // }
    };

    const actionColumn = [
        {
            field: 'status',
            headerName: 'Status',
            width: 95,
            renderCell: (params) => {
                const { label, color } = getStatusLabel(params.row.status);
                return (
                    <div>
                        <span
                            style={{
                                color: color,
                                padding: '5px',
                                borderRadius: '5px',
                                backgroundColor: 'rgba(5, 88, 5, 0.067)',
                            }}
                        >
                            {label}
                        </span>
                    </div>
                );
            },
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 265,
            renderCell: (params) => {
                return (
                    <div className='cellAction'>
                        <Button type='link' size='sm' onClick={() => handleViewOrder(params.id)}>
                            View
                        </Button>
                        {/* { role === 'customer' &&
                        <Button type='link' size='sm' onClick={() => hendleMakeComplete(params.id)} >
                            make as complete
                        </Button>
                        } */}
                        {(role === 'admin' || role === 'customer') &&
                            <Button onClick={() => showDeleteConfirm(params.id)} type="link" danger>
                                Delete
                            </Button>
                        }
                    </div>
                );
            },
        },

    ];

    return (
        <>


            <div className='top_header'>
                <div className='left'>
                    <span>{tableTitle} </span>
                </div>
                <div className='row'>
                    <div className='col-md-11 edit d-flex justify-content-end'>
                        <Link to='ViewAllOnMap' elament={<ViewAllOnMap />}>
                            <Button type="link">
                                View Orders On Map
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className='right'>{addButton}</div>
            </div>

            <div className='table' style={{ height: 491, width: '100%', marginTop: '1rem' }}>
                <DataGrid
                    rows={rows}
                    columns={columns.concat(actionColumn)}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    autoPageSize
                />
            </div>

        </>
    );
};
