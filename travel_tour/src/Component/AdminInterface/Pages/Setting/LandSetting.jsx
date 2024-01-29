
import React, { useState, useEffect, useContext } from 'react';
import { Descriptions, Input, Layout, Space, Tag, Pagination, Modal, Button, Card } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import SearchIcon from '@rsuite/icons/Search';
import { InputGroup } from 'rsuite';
import axios from '../../../../api/axios';
import AuthContext from '../../../../context/AuthProvider';
import { Link } from 'react-router-dom';
import LandPost from './LandPost';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AboutContant from './AboutContant';
import { useQuery, useMutation, queryClient } from 'react-query';
import { deletePost, fetchPosts } from '../../../../api/postAPI.jsx';
import LandEdit from './LandEdit.jsx';
import { fetchAbout } from '../../../../api/AboutAPI.jsx';
import EditAbout from './EditAbout.jsx';

const { Meta } = Card;
const { Sider, Content } = Layout;
const { Search } = Input;

export const LandSetting = () => {
    const [userRole, setUserRole] = useState('');
    const [services, setServices] = useState([]);
    const [postID, setPostID] = useState()
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const { confirm } = Modal;
    const { auth } = useContext(AuthContext);
    const { role } = auth;

    const { data: aboutData } = useQuery('abouts', fetchAbout);
    const { data: posts, isLoading, isError } = useQuery('posts', fetchPosts);

    const deleteTaskMutation = useMutation(() => deletePost(postID), {
        onSuccess: () => {
            queryClient.invalidateQueries('posts'); // Refresh the task list after deleting a task
        },
    });


    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error loading tasks</div>;


    // Delete
    const showDeleteConfirm = () => {

        //confirm modal
        confirm({
            title: 'Are you sure delete this Post?',
            icon: <ExclamationCircleFilled />,
            content: 'Once you click "Yes" the Post will be completelly delete',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                deleteTaskMutation.mutate();
                fetchPosts()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    // end Delete

    function srcset(image, width, height, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${width * cols}&h=${height * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

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
                    <h4>List of Available Land_Setting.</h4>
                </div>
                { aboutData?.length === 0 && (
                        <div className='right'>
                            <AboutContant />
                        </div>
                )}
                { aboutData?.length >= 1 && (
                        <div className='right'>
                            <EditAbout />
                        </div>
                )}
                   
                <div className='right'>
                    <LandPost />
                </div>
            </div>
            <div className='imageList'>
                <ImageList
                    sx={{
                        width: 1070,
                        // height: 505,
                            transform: 'translateZ(0)',
                    }}
                    // rowHeight={200}
                    gap={1}
                >
                    {posts.map((item) => {
                        const cols = item.featured ? 1 : 1;
                        const rows = item.featured ? 2 : 1;

                        return (
                            <ImageListItem key={item.img} cols={cols} rows={rows}>
                                <img
                                    {...srcset(item.photo, 250, 200, rows, cols)}
                                    alt={item.title}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    sx={{
                                        background:
                                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                    }}
                                    position="top"
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    actionIcon={
                                        <>
                                            <IconButton
                                                sx={{ color: 'red' }}
                                                onClick={() => { setPostID(item.id) }}
                                            >
                                                <DeleteIcon
                                                    onClick={showDeleteConfirm}
                                                />
                                            </IconButton>
                                            <IconButton
                                                sx={{ color: 'blue' }}
                                                onClick={() => { setPostID(item.id) }}
                                            >
                                                <LandEdit
                                                    postId={item.id}
                                                />
                                            </IconButton>
                                        </>
                                    }
                                    actionPosition="right"
                                />
                            </ImageListItem>
                        );
                    })}
                </ImageList>
            </div>
        </>

    );
};

export default LandSetting;

