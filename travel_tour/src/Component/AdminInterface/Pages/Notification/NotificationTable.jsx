import React, { useState, useEffect, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import axios from '../../api/axios';
import AuthContext from '../../context/AuthProvider';



export const NatificationTable = ({ tableTitle, rows, columns, addButton, refetchData }) => {
    const { confirm } = Modal;
    const [natification, setNotification] = useState([]);
    const [customerId, setCustomerId] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { auth } = useContext(AuthContext);
    const [currentStatus, setCurrentStatus] = useState('');
    const { role } = auth;
    const navigate = useNavigate();
    const [count, setCount] = useState()

    const fetchData = async () => {
        try {
            const response = await axios.get('order-service');
            setCount(response.data.length);

            setNotification(response.data);
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
                const response = await axios.delete(`notification/${id}/`);
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
                refetchData();
                navigate('/notification')
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    // Toggle visibility of order details block
    const handleViewOrder = (orderId) => {
        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder(null);
        } else {
            const order = natification.find((order) => order.id === orderId);
            setCurrentStatus(order.status)
            // Format the reg_date
            const formattedRegDate = new Date(order.reg_date).toLocaleString();

            // Update the reg_date value in the response data
            order.reg_date = formattedRegDate;

            setSelectedOrder(order);
        }
    };

    // Make order as complete

    const hendleMakeComplete = (id) => {


        const completeOrder = async (id) => {
            try {
                let newStatus = 'incomplete';

                if (currentStatus === 'incomplete') {
                    alert("you can't make it, untel your technician accept and complete your order ");
                }
                else if (currentStatus === 'rejected') {
                    alert("it's rejected order, you can't make it complete order");

                }
                else if (currentStatus === 'pending') {
                    newStatus = 'completed';
                    await axios.put(`service-orders/${id}/change-status/`, { status: newStatus });
                }
                else {
                    alert("it's complete order");
                }
                // else if (currentStatus === 'pending') {

                //   newStatus = 'completed';
                //   await axios.put(`service-orders/${id}/change-status/`, { status: newStatus });

                // }


                // setStatus(newStatus);
                // if (newStatus === 'completed') {
                //   alert("It's complete!");
                // }
            } catch (error) {
                console.error('Error updating status:', error);
            }
        };

        confirm({
            title: 'Are you sure Accept this order?',
            icon: <ExclamationCircleFilled />,
            content: 'By click ok, you comferm as your order is complete',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                completeOrder(id);
                // navigate('/order')
            },
            onCancel() {
                console.log('Cancel');
            },
        });
        // fetchOrderData()
    }


    const getStatusLabel = (notificationStatus) => {
        const statusMap = {
            'read': {
                label: 'read',
                color: 'green',
            },
            'received': {
                label: 'Received',
                color: 'goldenrod',
            },
            'unreceived': {
                label: 'Unreceived',
                color: 'gray',
            },
          
        };

        // Check if the status exists in the statusMap, if yes, return the corresponding label and color
        if (statusMap.hasOwnProperty(notificationStatus)) {
            return statusMap[notificationStatus];
        } 
        else {
            // If the status doesn't exist in the statusMap, return a default label and color
            return {
                label: 'Unknown',
                color: 'white',
            };
        }
    };


    const actionColumn = [
        {
            field: 'notificationStatus',
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
            width: 135,
            renderCell: (params) => {
                return (
                    <div className='cellAction'>
                        <Button type='link' size='sm' onClick={() => handleViewOrder(params.id)}>
                            View
                        </Button>
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
    console.log('Rows:', rows);
    return (
        <>


            <div className='top_header'>
                <div className='left'>
                    <span>{tableTitle} </span>
                </div>
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
