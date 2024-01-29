import React, { useState, useEffect, useContext } from 'react';
import { Descriptions, Input, Layout, Space, Tag, Pagination, Modal, Button, Card, Flex, Typography, Tooltip } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import SearchIcon from '@rsuite/icons/Search';
import { InputGroup } from 'rsuite';
import axios from '../../../../api/axios';
import AuthContext from '../../../../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, queryClient } from 'react-query';
import { fetchDestinations, deleteDestination, fetchDestinationAreas } from '../../../../api/DestinationAPI';
import AddDestination from './AddDestination';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import EditDestination from './EditDestination';
import AddArea from './AddArea';



const { Meta } = Card;
const { Sider, Content } = Layout;
const { Search } = Input;

export const AdminDestination = () => {
    const [userRole, setUserRole] = useState('');
    const [destinations, setDestinations] = useState([]);
    const [destinationId, setDestinationId] = useState([]);
    const [areaId, setAreaId] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const { confirm } = Modal;
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { role } = auth;


    // check role of logIn user
    useEffect(() => {
        setUserRole(role);
    }, [role]);

    // Fetch
    const { data: destination, isLoading, isError } = useQuery('destination', fetchDestinations);
    const { data: destinationArea, isLoadingArea, isErrorArea } = useQuery('destinationArea', fetchDestinationAreas);

    console.log(areaId)
    const deleteTaskMutation = useMutation(() => deleteDestination(destinationId), {
        onSuccess: () => {
            queryClient.invalidateQueries('destination');
        },
    });

    // Set destinations inside useEffect
    useEffect(() => {
        if (destination) {
            // setDestinations(destination.reverse());
            setDestinations(destination);

        }
    }, [destination]);



    if (isLoading || isLoadingArea) return <div>Loading...</div>;

    if (isError || isErrorArea) return <div>Error loading</div>;

    const handleViewDestination = (destinationID) => {
        navigate(`destination/${destinationID}`)
    };

    // Delete
    const showDeleteConfirm = () => {


        //confirm modal
        confirm({
            title: 'Are you sure delete this Destination?',
            icon: <ExclamationCircleFilled />,
            content: 'Once you click "Yes" the destination will be completelly delete',
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

    // Search
    const handleSearch = (value) => {
        setSearchValue(value);
        setCurrentPage(1);
    };

    const filteredDestinations = destinations.filter((destination) =>
        destination.title.toLowerCase().includes(searchValue.toLowerCase())
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
    const paginatedDestinations = filteredDestinations.slice(startIndex, endIndex);
    const totalDestinations = filteredDestinations.length;
    const totalPages = Math.ceil(totalDestinations / pageSize);
    // End of Pagination

    const cardStyle = {
        width: 1040,
        height: 250,
    };

    const imgStyle = {
        display: 'block',
        width: 400,
        height: 248,
    };


    return (

        <>
            <div className='top_header'>
                <div className='left'>
                    <span>List of Available Destination.</span>
                </div>
                <div className='right'>
                    <AddDestination />
                </div>
            </div>

            {/* Search input */}
            <div className="search py-2">
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


            {/* List of destinations */}
            {paginatedDestinations.map((destination) => (
                <div key={destination.id} className="destination py-1">
                    <Card
                        hoverable
                        style={cardStyle}
                        bodyStyle={{
                            padding: 1,
                            overflow: 'hidden',
                        }}
                    >
                        <Flex justify="space-between">
                            <img
                                alt="avatar"
                                src={destination?.photo || 'https://placeholder.com/273x150'}
                                style={imgStyle}
                            />
                            <Flex
                                vertical
                                align="flex-end "
                                justify="space-between"
                                style={{
                                    padding: 32,
                                }}
                            >
                                <Typography.Title level={5}>
                                    {destination?.title}
                                </Typography.Title>
                                <span>
                                    {destination?.description || 'Loading...'}
                                </span>
                                <Button
                                    type="link"
                                    // href={destination?.link || 'https://ant.design'}
                                    onClick={() => { setAreaId(destination.id) }}
                                    target="_blank">
                                    <AddArea
                                        areId={areaId}
                                    />
                                </Button>

                                <Stack direction="row" className='mt-2' spacing={0}>
                                    <Flex vertical>
                                        <Flex wrap="wrap">
                                            {destinationArea.map((destinationArea) => (
                                                (destinationArea.destination.id === destination.id) ? (
                                                    <Stack direction="row" spacing={0}>
                                                        <Button type='link' size="sm"
                                                            onClick={() => {
                                                                setDestinationId(destinationArea.destination.id)
                                                                handleViewDestination(destinationArea.id)
                                                            }}
                                                        >
                                                            {destinationArea.title}
                                                        </Button>
                                                    </Stack>
                                                ) : null
                                            ))}
                                        </Flex>
                                    </Flex>
                                    <div>
                                        <Flex gap="small" vertical>
                                            <Flex wrap="wrap" gap="small">
                                                <Tooltip title="Edit">
                                                    <Button
                                                        type="primary"
                                                        shape="circle">
                                                        <EditDestination destinationId={destination.id} />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <Button
                                                        shape="circle"
                                                        danger icon={<DeleteIcon />}
                                                        onClick={() => {
                                                            setDestinationId(destination.id);
                                                            showDeleteConfirm();
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Flex>
                                        </Flex>
                                    </div>
                                </Stack>
                            </Flex>
                        </Flex>
                    </Card>
                </div>
            ))}
            {/* End of List of destinations */}

            {/* Pagination */}
            <div className="py-3 pagination-container d-flex justify-content-center">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalDestinations}
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

export default AdminDestination;
