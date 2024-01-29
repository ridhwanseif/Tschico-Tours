import React, { useContext, useEffect, useState } from 'react'
import './notification.scss';
import axios from '../../../../api/axios';
import AuthContext from '../../../../context/AuthProvider';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';



export const Notification = () => {

    const [notification, setNotification] = useState([]);
    // const [userRole, setUserRole] = useState('customer');
    const { auth } = useContext(AuthContext);
    const { role, customer_id, technician_id, user_id } = auth;
    const [currentStatus, setCurrentStatus] = useState('');
    const navigate = useNavigate();
    const [count, setCount] = useState()
    const [contents, setContent] = useState('');
    const [tech_ID, setTech_ID] = useState(null)
    const [user , setUser] = useState('')

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
                label: 'unreceived',
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
                label: 'unknow',
                color: 'yellow',
            };
        }
    };


    //start order data
    const notificationColumns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70
        },
        {
            field: 'techUser',
            headerName: 'Notification from',
            renderCell: (params) => {
                return (
                    <>
                       {user.first_name}
                    </>
                );
            },
            sortable: false,
            width: 200,
        },

        {
            field: 'content',
            headerName: 'Content',
            width: 260
        },
        {
            field: 'notificationStatus',
            headerName: 'Status',
            width: 95,
            renderCell: (params) => {
                const { label, color } = getStatusLabel(params.row.notificationStatus);
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
                        <Button type='link' size='sm'
                        onClick={() => handleViewNotification(params.id)}
                        >
                            View
                        </Button>
                        {/* {(role === 'admin' || role === 'customer') && */}
                            <Button onClick={() => showDeleteConfirm(params.id)} type="link" danger>
                                Delete
                            </Button>
                        {/* } */}
                    </div>
                );
            },
        },
    ];

  // view notification 
  const handleViewNotification = (id) =>{
    const viewNotificstion = async (id) => {
        try {
            const response = await axios.get(`notification/${id}/`);
            setContent(response.data.content)
            console.log('veiw resource:', response.data);
        } catch (error) {
            console.error('Error deleting resource:', error);
        }
    };
    viewNotificstion(id);
    confirm({
        title: 'Notification information',
        icon: <ExclamationCircleFilled />,
        content: contents,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            console.log('OK');
            viewNotificstion(id);
            fetchData();
        },
        onCancel() {
        },
    });
  }


    const fetchData = async () => {
        try {
            // if (role === 'admin') {
            const response = await axios.get('notification/criterial');
            console.log(response.data.techUser)
            setNotification(response.data);
            setTech_ID(response.data.techUser)
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    const fetchUser = async () => {
        try {
            const response = await axios.get(`user/detail/${tech_ID}/`);
            setUser(response.data);
            // console.log(response.data);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
        fetchUser();
    }, []);
    const { confirm } = Modal;

// Delete notification
    const showDeleteConfirm = (id) => {
        console.log('Cancel');
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
                fetchData();
            },
            onCancel() {
            },
        });
    };


    return (
        <>
            <div className='top_header'>
                <div className='left'>
                    <span>Notification:</span>
                </div>
            </div>

            <div className='table' style={{ height: 491, width: '100%', marginTop: '1rem' }}>

                <DataGrid
                    rows={notification}
                    columns={notificationColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    autoPageSize
                />
            </div>


        </>
    );
}

export default Notification;