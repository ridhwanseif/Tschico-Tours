import React, { useState, useEffect, useContext } from 'react';
import { Input, Layout, Modal, Card } from 'antd';

import AuthContext from '../../../../context/AuthProvider';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchExcursions, deleteExcursion } from '../../../../api/ExcursionAPI';
import { ExcursionTable } from './TableExcursion';



const { Meta } = Card;
const { Sider, Content } = Layout;
const { Search } = Input;

export const AdminExcursion = () => {
    const [userRole, setUserRole] = useState('');
    const [excursions, setExcursions] = useState([]);
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

    //start excursion data
    const excursionColumns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70
        },

        {
            field: 'title',
            headerName: 'Excursion',
            width: 200
        },
        {
            field: 'longDescription',
            headerName: 'Dedcription',
            width: 500
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 100
        },
        
        
    ];


    // Fetch
    const { data: excursion, isLoading, isError } = useQuery('excursion', fetchExcursions);

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error loading</div>;


  
   
    return (

        <>            
            {/* List of excursions */}
            <ExcursionTable
                tableTitle='Excursions.'
                columns={excursionColumns}
                rows={excursion}
            />
            {/* End of List of excursions */}
        </>

    );
};

export default AdminExcursion;
