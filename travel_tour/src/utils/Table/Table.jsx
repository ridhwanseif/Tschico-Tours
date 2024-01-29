import './table.scss';
import React, { useState, useEffect, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import axios from '../../api/axios';
import AuthContext from '../../context/AuthProvider';
// import UpdateUserForm from '../../Pages/User/UpdateUserForm';



export const Table = ({ tableTitle, rows, columns, addButton }) => {
  const { confirm } = Modal;
  const [userRole, setUserRole] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { auth } = useContext(AuthContext);
  const { role } = auth;



  // check role of logIn user
  useEffect(() => {
    setUserRole(role);
  }, [role]);


  const fetchData = async () => {
    try {
      const response = await axios.get('users/');
      setUsers(response.data);
      console.log(response.data)
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const showDeleteConfirm = (id) => {
    const deleteService = async (id) => {
      try {
        const response = await axios.delete(`user/detail/${id}/`);
        console.log('Deleted resource:', response.data);
      } catch (error) {
        console.error('Error deleting resource:', error);
      }
    };

    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        deleteService(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // verify User
  const handleVerifyUser = (id) => {
    // userRole === 'admin' && (
      axios.get(`verify_user/${id}/`)
        .then(response => {
          console.log(response.data.message); // Display the response message in the console
        })
        .catch(error => {
          console.error('Error:', error);
        })
    // )
  }


  // Toggle visibility of user details block
  const handleViewUser = (userId) => {
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser(null);
    } else {
      const user = users.find((user) => user.id === userId);

      // Format the reg_date
      const formattedRegDate = new Date(user.reg_date).toLocaleString();

      // Update the reg_date value in the response data
      user.reg_date = formattedRegDate;

      setSelectedUser(user);
    }
  };

  const actionColumn = [
    {
      field: 'status',
      headerName: 'Status',
      width: 95,
      renderCell: (params) => {
        return (
          <div>
            {params.row.status ? (
              <span style={{
                color: 'green',
                padding: '5px',
                borderRadius: '5px',
                backgroundColor: 'rgba(5, 88, 5, 0.067)'
              }}>Verified</span>
            ) : (
              <span
                onClick={() => handleVerifyUser(params.id)}
                style={{
                  color: 'goldenrod',
                  padding: '5px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  backgroundColor: 'rgba(5, 88, 5, 0.067)'
                }}>Not Verified</span>

            )}
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
            <Button type='link' size='sm' onClick={() => handleViewUser(params.id)}>
              View
            </Button>
            {userRole === 'admin' &&
              <Button onClick={() => showDeleteConfirm(params.id)} type="link" danger>
                Delete
              </Button>
            }
          </div>
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
        <div className='right'>{addButton}</div>
      </div>

      {/* User Details Block */}
      {selectedUser && (

        <div className="user-details">
          <div className='top-single'>
            <div className='left'>

              <img
                src={selectedUser.photo}
                alt=''
                className='itemImg'
              />

            </div>
            <div className='right'>
              <span style={{ fontSize: '1.3rem' }} >User Details</span>
              <div className='row'>
                <div className='col-md-4'>
                  <p>Name: {
                    selectedUser.first_name
                    + ' ' + selectedUser.mid_name
                    + ' ' + selectedUser.last_name
                  }</p>
                  <p>User Name: {selectedUser.username}</p>
                  <p>Email: {selectedUser.email}</p>

                </div>
                <div className='col-md-4'>
                  <p>Address: {selectedUser.address}</p>
                  <p>Role: {selectedUser.role.name}</p>
                  <p>Phone Number: {selectedUser.phone_number}</p>


                </div>
                <div className='col-md-4'>
                  <p>Register Date: {selectedUser.reg_date}</p>
                  <p>Gender: {selectedUser.gender}</p>
                </div>

              </div>
              <div className='edit d-flex justify-content-end'>
                {/* {userRole === 'admin' && (
                  <UpdateUserForm
                  userId={selectedUser.id} />
                )} */}
              </div>

            </div>
          </div>
        </div>

      )}

      <div className='table' style={{ height: 491, width: '100%', marginTop: '1rem' }}>
        <DataGrid
          rows={rows}
          columns={columns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // checkboxSelection
          autoPageSize
        />
      </div>


    </>
  );
};
