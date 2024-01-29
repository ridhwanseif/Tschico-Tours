import React, { useState, useEffect, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Flex, Modal, Tooltip } from 'antd';
import AddExcursion from './AddExcursion';
import { deleteExcursion } from '../../../../api/ExcursionAPI';
import { QueryClient, useMutation } from 'react-query';
import EditExcursion from './EditExcursion';
import DeleteIcon from '@mui/icons-material/Delete';
    
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';



export const ExcursionTable = ({ tableTitle, rows, columns, addButton }) => {
    const { confirm } = Modal;
    // const [userRole, setUserRole] = useState('');
    const [excursions, setExcursions] = useState([]);
    const [customerId, setCustomerId] = useState([]);
    const [excursionId, setExcursionId] = useState([]);
    const [selectedExcursion, setSelectedExcursion] = useState(null);
    // const { auth } = useContext(AuthContext);
    const [currentStatus, setCurrentStatus] = useState('');
    // const { role } = auth;
    const navigate = useNavigate();
    const [count, setCount] = useState()

    // check role of logIn user
    // useEffect(() => {
    //     setUserRole(role);
    // }, [role]);


    const deleteTaskMutation = useMutation(() => deleteExcursion(excursionId), {
        onSuccess: () => {
            QueryClient.invalidateQueries('excursion'); // Refresh the task list after deleting a task
        },
    });

    // Delete
    const showDeleteConfirm = () => {


        //confirm modal
        confirm({
            title: 'Are you sure delete this Excursion?',
            icon: <ExclamationCircleFilled />,
            content: 'Once you click "Yes" the excursion will be completelly delete',
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

    const handleViewExcursion = (excursionId) => {
        navigate(`excursion/${excursionId}`)
    };





    const actionColumn = [
        // {
        //     field: 'status',
        //     headerName: 'Status',
        //     width: 95,
        //     renderCell: (params) => {
        //         const { label, color } = getStatusLabel(params.row.status);
        //         return (
        //             <div>
        //                 <span
        //                     style={{
        //                         color: color,
        //                         padding: '5px',
        //                         bexcursionRadius: '5px',
        //                         backgroundColor: 'rgba(5, 88, 5, 0.067)',
        //                     }}
        //                 >
        //                     {label}
        //                 </span>
        //             </div>
        //         );
        //     },
        // },
        {
            field: 'action',
            headerName: 'Action',
            width: 160,
            renderCell: (params) => {
                return (
                    <div className='cellAction'>
                        {/* <Button type='link' size='sm' 
                        onClick={() => {
                            setExcursionId(params.id)
                            handleViewExcursion(params.id)
                        }}>
                            View
                        </Button>
                        <Button type='link' size='sm'>
                            <EditExcursion excursionId={params.id} />
                        </Button>
                        <Button
                            onClick={() => {
                                setExcursionId(params.id);
                                showDeleteConfirm();
                            }}
                            type="link" danger>
                            Delete
                        </Button> */}
                        <Flex gap="small" vertical>
                            <Flex wrap="wrap" gap="small">
                                <Tooltip title="Veiw">
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<RemoveRedEyeIcon />}
                                        onClick={() => {
                                            setExcursionId(params.id)
                                            handleViewExcursion(params.id)
                                        }}
                                    />
                                </Tooltip>
                                <Tooltip title="Edit">
                                    <Button
                                        type="primary"
                                        shape="circle">
                                        <EditExcursion excursionId={params.id} />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <Button
                                        shape="circle"
                                        danger icon={<DeleteIcon />}
                                        onClick={() => {
                                            setExcursionId(params.id);
                                            showDeleteConfirm();
                                        }}
                                    />
                                </Tooltip>
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
                            View Excursions
                        </Button>
                        {/* </Link> */}
                    </div>
                </div>
                <div className='right'>
                    {addButton}
                    <AddExcursion />
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
