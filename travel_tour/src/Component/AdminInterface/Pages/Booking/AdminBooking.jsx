import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../../context/AuthProvider';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchBooking, deleteBooking } from '../../../../api/BookingAPI';
import { BookingTable } from './TableBooking';



export const AdminBooking = () => {
    const [userRole, setUserRole] = useState('');
    const { auth } = useContext(AuthContext);
    const { role } = auth;


    // Fetch
    const { data: booking, isLoading, isError } = useQuery('booking', fetchBooking);

    // check role of logIn user
    useEffect(() => {
        fetchBooking();
    }, [booking]);

    //start booking data
    const bookingColumns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70
        },
        {
            field: 'firstName',
            headerName: 'Name',
            renderCell: (params) => {
                return (
                    <div className='cellWithImg'>
                        {/* <img className='cellImg' src={params.row.service.photo} alt="img_error" /> */}
                        {params.row.firstName + ' ' + params.row.lastName}
                    </div>
                );
            },
            sortable: false,
            width: 150,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 160
        },
        
        {
            field: 'pickUp_Location',
            headerName: 'PickUp',
            width: 110
        },
        {
            field: 'dropOff_Location',
            headerName: 'DropOff',
            width: 110
        },
        {
            field: 'order_date',
            headerName: 'Date',
            renderCell: (params) => {
                // Format the date
                const formattedRegDate = new Date(params.row.order_date).toLocaleString();
        
                return (
                    <div className='date'>
                        {formattedRegDate}
                    </div>
                );
            },
            sortable: false,
            width: 170
        }
        ,
    ];


    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error loading</div>;




    return (

        <>
            {/* List of bookings */}
            <BookingTable
                tableTitle='Bookings.'
                columns={bookingColumns}
                rows={booking}
            />
            {/* End of List of bookings */}
        </>

    );
};

export default AdminBooking;
