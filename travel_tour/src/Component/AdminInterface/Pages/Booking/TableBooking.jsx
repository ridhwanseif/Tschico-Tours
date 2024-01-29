import React, { useState, useEffect, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { deleteBooking } from '../../../../api/BookingAPI';
import { QueryClient, useMutation } from 'react-query';
import ViewBooking from './ViewBooking';
import DeleteIcon from '@mui/icons-material/Delete';
import { Flex, Tooltip } from 'antd';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';


export const BookingTable = ({ tableTitle, rows, columns, addButton }) => {
    const { confirm } = Modal;
    // const [userRole, setUserRole] = useState('');
    const [bookings, setBookings] = useState([]);
    const [customerId, setCustomerId] = useState([]);
    const [bookingId, setBookingId] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    // const { auth } = useContext(AuthContext);
    const [currentStatus, setCurrentStatus] = useState('');
    // const { role } = auth;
    const navigate = useNavigate();
    const [count, setCount] = useState()

    // check role of logIn user
    // useEffect(() => {
    //     setUserRole(role);
    // }, [role]);


    const deleteTaskMutation = useMutation(() => deleteBooking(bookingId), {
        onSuccess: () => {
            QueryClient.invalidateQueries('booking'); // Refresh the task list after deleting a task
        },
    });

    // Delete
    const showDeleteConfirm = () => {


        //confirm modal
        confirm({
            title: 'Are you sure delete this Booking?',
            icon: <ExclamationCircleFilled />,
            content: 'Once you click "Yes" the booking will be completelly delete',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                deleteTaskMutation.mutate();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    // end Delete

    const handleViewBooking = (bookingId) => {
        navigate(`booking/${bookingId}`)
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
                                bbookingRadius: '5px',
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
            width: 100,
            renderCell: (params) => {
                return (
                    <div className='cellAction'>
                        <Flex gap="small" vertical>
                            <Flex wrap="wrap" gap="small">
                                <Tooltip title="search">
                                    <ViewBooking
                                        bookingId={params.row.id}
                                    />
                                </Tooltip>
                                <Button
                                    shape="circle"
                                    type='link' danger
                                    icon={<DeleteIcon />}
                                    onClick={() => {
                                        setBookingId(params.id);
                                        showDeleteConfirm();
                                    }
                                    } />
                            </Flex>
                        </Flex>

                    </div >
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
                        {/* <Link to='ViewAllOnMap' elament={<ViewAllOnMap />}> */}
                        <Button type="link">
                            View Bookings
                        </Button>
                        {/* </Link> */}
                    </div>
                </div>
                <div className='right'>
                    {addButton}
                    {/* <AddBooking /> */}
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
