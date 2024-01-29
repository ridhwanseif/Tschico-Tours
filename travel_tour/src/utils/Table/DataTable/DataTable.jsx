
// user Data
import Img from './tech3.jpg'
import '.././table.scss'
import React, {useState, useEffect} from 'react';





export const allColumns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 50
    },

    {
        field: 'user',
        headerName: 'User',
        renderCell: (params)=>{
            return(
            <div className='cellWithImg'>
                
                <img className='cellImg' src={params.row.img} alt="img_error" />
                {params.row.address}
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
        width: 100
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 100
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 70,
        renderCell: (params)=>{
            return(
            <div className={`cellWithStatus ${params.row.status}`}>
                {params.row.status}
            </div>
            );
        },
    },
    
    
];


export const allRows = [
    {
        id: 1,
        address: 'Ridhwan Seif',
        email: 'waririzi65@gmail.com',
        img: Img,
        status: 'active',
        role: 'Admin',
        title: 'Electrical Engner'

    },

   

];

// Service data

export const technicianColumns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 70
    },

    {
        field: 'fullName',
        headerName: 'Full_Name',
        renderCell: (params)=>{
            return(
            <div className='cellWithImg'>
                <img className='cellImg' src={params.row.img} alt="img_error" />
                {params.row.address}
            </div>
            );
        },
        sortable: false,
        width: 240,
    },

    {
        field: 'address',
        headerName: 'address',
        width: 130
    },

    {
        field: 'title',
        headerName: 'Title',
        width: 100,
    },
    {
        field: 'email',
        headerName: 'Email',
        sortable: false,
        width: 160,
       
    },
];


export const  technicianRows = [

    
    {
        id: 1,
        fullName: 'service1',
        address: 'Jon',
        title: 35,
        email: './tech.jpg'

    },
  
];


// technician data

export const customerColumns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 70
    },
    {
        field: 'fullName',
        headerName: 'Full_Name',
        renderCell: (params)=>{
            return(
            <div className='cellWithImg'>
                <img className='cellImg' src={params.row.img} alt="img_error" />
                {params.row.address}
            </div>
            );
        },
        sortable: false,
        width: 240,
    },
    {
        field: 'address',
        headerName: 'address',
        width: 130
    },
    {
        field: 'email',
        headerName: 'Email',
        sortable: false,
        width: 160,
       
    },
];


export const customerRows = [
    {
        id: 1,
        fullName: 'service1',
        address: 'Jon',
        age: 35,
        img: './tech.jpg'

    },

    {
        id: 2,
        fullName: 'service2',
        address: 'Cersei',
        age: 42,
        img: './tech.jpg'
    },

    {
        id: 3,
        fullName: 'service3',
        address: 'Jaime',
        age: 45,
        img: './tech.jpg'
    },

    {
        id: 4,
        fullName: 'service4',
        address: 'Arya',
        age: 16,
        img: './tech.jpg'
    },

    {
        id: 5,
        fullName: 'service5',
        address: 'Daenerys',
        age: null,
        img: './tech.jpg'
    },

    {
        id: 6,
        fullName: 'service6',
        address: null,
        age: 150,
        img: './tech.jpg'
    },

    {
        id: 7,
        fullName: 'service7',
        address: 'Ferrara',
        age: 44,
        img: './tech.jpg'
    },

    {
        id: 8,
        fullName: 'service8',
        address: 'Rossini',
        age: 36,
        img: './tech.jpg'
    },

    {
        id: 9,
        fullName: 'service9',
        Address: 'Harvey',
        age: 65,
        img: './tech.jpg'
    },
    {
        id: 10,
        fullName: 'service10',
        Address: 'Harvey',
        age: 65,
        img: './tech.jpg'
    },
    {
        id: 11,
        fullName: 'service11',
        address: 'Harvey',
        age: 65,
        img: './tech.jpg'
    },
    {
        id: 12,
        fullName: 'service12',
        address: 'Harvey',
        age: 65,
        img: './tech.jpg'
    },
];

//start service data
// export const serviceColumns = [
//     {
//         field: 'id',
//         headerName: 'ID',
//         width: 70
//     },
//     {
//         field: 'serviceName',
//         headerName: 'Service_Name',
//         renderCell: (params)=>{
//             return(
//             <div className='cellWithImg'>
//                 <img className='cellImg' src={params.row.img} alt="img_error" />
//                 {params.row.address}
//             </div>
//             );
//         },
//         sortable: false,
//         width: 200,
//     },
//     {
//         field: 'discription',
//         headerName: 'Discription',
//         width: 260
//     },
    
// ];


// useEffect(()=>{
//     fetch("http://localhost:8000/roles")
//     .then(res=>res.json())
//     .then((result)=>{
//         setService(result);
//     }
//     )
//   },[])

// export const serviceRows = [
//     {
//         id: services.id,
//         fullName: services.name,
//         address: 'Jon',
//         age: 35,
//         img: './tech.jpg'

//     }
   
// ];
// data service end

// order 
export const orderColumns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 70
    },
    {
        field: 'serviceName',
        headerName: 'Service_Name',
        renderCell: (params)=>{
            return(
            <div className='cellWithImg'>
                <img className='cellImg' src={params.row.img} alt="img_error" />
                {params.row.address}
            </div>
            );
        },
        sortable: false,
        width: 200,
    },
    {
        field: 'discription',
        headerName: 'Discription',
        width: 260
    },
    
];