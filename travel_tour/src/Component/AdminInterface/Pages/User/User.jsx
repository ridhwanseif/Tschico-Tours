import React, { useState, useEffect, useContext } from 'react'
import './User.scss';
import Tab1 from '../../../../utils/Tabs/Tab1';
import { Layout, Space, theme } from 'antd';
import { Table } from '../../../../utils/Table/Table';
import { Link } from 'react-router-dom';
import { Button } from 'rsuite';
// import NewTechnician from './NewTechnician';
// import NewCustomer from './NewCustomer';
import axios from '../../../../api/axios';
import AuthContext from '../../../../context/AuthProvider';




const { Sider, Content } = Layout;

export const User = () => {

    const [users, setUsers] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [technician, setTechnician] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [userRole, setUserRole] = useState('');
    const { auth } = useContext(AuthContext);
    const { role } = auth;

    // check role of logIn user
    useEffect(() => {
        setUserRole(role);
    }, [role]);


    const handDisplay = () => {
        setCollapsed(!collapsed)
    }


    //start all users data
    const UserCols = [
        {
            field: 'id',
            headerName: 'ID',
            width: 50
        },

        {
            field: 'user',
            headerName: 'Full Name',
            renderCell: (params) => {
                return (
                    <div className='cellWithImg'>
                        <img className='cellImg' src={params.row.photo} alt="img_error" />
                        {params.row.first_name + " " + params.row.mid_name + " " + params.row.last_name}
                    </div>
                );
            },
            sortable: false,
            width: 200,
        },

        {
            field: 'address',
            headerName: 'Address',
            width: 110
        },

        {
            field: 'email',
            headerName: 'Email',
            type: 'email',
            width: 170,
        },
        {
            field: 'role',
            headerName: 'Roles',
            renderCell: (params) => {
                return (
                    <div className='role'>
                        {
                            (params.row.role.name)
                        }
                    </div>
                );
            },
            sortable: false,
            width: 95
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 95
        },

    ];

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const allUsers = 'users/';
            const response = await axios.get(allUsers)

            // Handle the data as needed
            console.log('Users:', response.data);

            // Update state or perform other operations
            setUsers(response.data.reverse());


        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    return (
        <>
            {/* body content*/}

          <Table
                    columns={UserCols}
                    rows={users}
                    tableTitle='All Use.'
                />
            {/* end of body content */}
        </>

    )
}

export default User;



// params.row.role === 1 ? (
//     <span className='admin'>Admin</span>
// ) : params.row.role === 2 ? (
//     <span className='technician'>Technician</span>
// ) : params.row.role === 3 ? (
//     <span className='customer'>customer</span>
// ) : (
//     <span className='unknown'>Unknown</span>
// )


