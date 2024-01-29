import React, { useState, useEffect, useContext } from 'react';
import { Button, Layout, Space } from 'antd';
import MakeOrder from './MakeOrder';
import { Link } from 'react-router-dom';
import { OrderTable } from './OrderTable';
import axios from '../../../../api/axios';
import AuthContext from '../../../../context/AuthProvider';


export const Order = () => {
    const [orders, setOrder] = useState([]);
    // const [userRole, setUserRole] = useState('customer');
    const { auth } = useContext(AuthContext);
    const { role, customer_id, technician_id } = auth;
    const [orderStatus, setOrderStatus] = useState('')

    //start order data
    const orderColumns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70
        },
        {
            field: 'OrderedBy',
            headerName: 'Ordered_Service',
            renderCell: (params) => {
                return (
                    <div className='cellWithImg'>
                       { setOrderStatus(params.row.status)}
                        <img className='cellImg' src={params.row.service.photo} alt="img_error" />
                        {params.row.service.service_name}
                    </div>
                );
            },
            sortable: false,
            width: 200,
        },
        {
            field: 'order_date',
            headerName: 'Order_Date',
            width: 120
        },
        {
            field: 'description',
            headerName: 'Dedcription',
            width: 260
        },

    ];


    const fetchData = async () => {
        try {
            if (role === 'admin') {
                const response = await axios.get('order-service');
                setOrder(response.data);
            }
            else if (role === 'technician') {
                const response = await axios.get(`order-service/userRole/${technician_id}/`);
                    setOrder(response.data);
            }
            else {
                const response = await axios.get(`order-service/userRole/${customer_id}/`);
                setOrder(response.data);
            }
            // console.log(response.data.location)
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <>
            <OrderTable
                tableTitle='Orders.'
                columns={orderColumns}
                rows={orders}
                addButton={
                    <Link to='makeOrder' elament={<MakeOrder />}>
                        {role === 'customer' && (
                            <Button>Make Order</Button>
                        )}
                    </Link>
                }
            />
        </>

    )
}

export default Order;