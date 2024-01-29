import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from 'rsuite';
import axios from '../../../../api/axios';
import icon from './constants';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import AuthContext from '../../../../context/AuthProvider';

const ViewOnMap = () => {
  const [order, setOrder] = useState({});
  const [currentStatus, setCurrentStatus] = useState('');

  const { auth } = useContext(AuthContext);
  const { role, customer_id, user_id } = auth;
  const [status, setStatus] = useState('Unreceived');
  const [content, setContent] = useState('congratulations, order is accepted by technician, please provide feedback when it is complete');
  const navigate = useNavigate();
  const { confirm } = Modal;
  const { id } = useParams();

  useEffect(() => {
    fetchOrderData();
    // fetchCustomerData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(`order-service/${id}/`);
      const customerResponse = await axios.get(`customer/${response.data.customer}`);
      setCurrentStatus(response.data.status)

      const orderData = response.data;
      // console.log(orderData)

      const customerData = customerResponse.data;
      // console.log(currentStatus)

      const [longitude, latitude] = orderData.location
        .replace('SRID=4326;POINT (', '')
        .replace(')', '')
        .split(' ');

      const formattedOrder = {
        ...customerData,
        ...orderData,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        position: [parseFloat(longitude), parseFloat(latitude)]
      };

      setOrder(formattedOrder);
      // console.log(formattedOrder)
    } catch (error) {
      console.error(error);
    }
  };



  // Delete
  const showDeleteConfirm = (id) => {
    const deleteOrder = async (id) => {
      try {
        const response = await axios.delete(`order-service/${id}/`);
        console.log('Deleted resource:', response.data);
      } catch (error) {
        console.error('Error deleting resource:', error);
      }
    };

    confirm({
      title: 'Are you sure delete or cancel this order?',
      icon: <ExclamationCircleFilled />,
      content: 'By click yes, the order will be cancel and deleted',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        deleteOrder(id);
        navigate('/order')
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // reject
  const handleReject = (id) => {
    const rejectOrder = async (id) => {
      try {
        let newStatus = 'incomplete';

        if (currentStatus === 'incomplete') {
          newStatus = 'rejected';
          await axios.put(`service-orders/${id}/change-status/`, { status: newStatus });
          setContent('Your order is rejected by technician, you have to reorder to another technician')
        }
        // else if(currentStatus === 'pending'){
        //   alert("you have alredy accept this order");
        // }
        // else{
        //   alert("it's complete order");
        // }
        SendNotification();
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };

    confirm({
      title: 'Are you sure Reject this order?',
      icon: <ExclamationCircleFilled />,
      content: 'By click yes, you rejected to work this customer',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        rejectOrder(id);
        // navigate('/order')
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    fetchOrderData()
  }

  // Accept
  // const [status, setStatus] = useState(currentStatus);

  const handleAccept = (id) => {

    const acceptOrder = async (id) => {
      try {
        let newStatus = 'incomplete';

        if (currentStatus === 'incomplete') {
          newStatus = 'pending';
          await axios.put(`service-orders/${id}/change-status/`, { status: newStatus });
          setContent('congratulations, order is accepted by technician, please provide feedback when it is complete')
        }
        else if (currentStatus === 'pending') {
          alert("you have alredy accept this order");
        }
        else {
          alert("it's complete order");
        }
        SendNotification();

      } catch (error) {
        console.error('Error updating status:', error);
      }
    };
    console.log(content)
    confirm({
      title: 'Are you sure Accept this order?',
      icon: <ExclamationCircleFilled />,
      content: 'By click ok, you comferm to work this customer',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        acceptOrder(id);
        // navigate('/order')
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    fetchOrderData()
  }

  // send Notification
  const SendNotification = async () => {

    // Create a new notification object to send to the server
    const newNotification = {
      'status': status,
      'content': content || 'Your order is rejected by technician, you have to reorder to another technician',
      'techUser': user_id
    };
    try {
      // Perform the post request to the backend API endpoint using Axios
      const response = await axios.post('notification/create', newNotification);

      // Notification successfully created, do something with the response if needed
      console.log('Notification created:', response.data);

      // Clear the form fields after successful submission
      setStatus('Unreceived');
      setContent('');

    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };



  // Make order as complete

  const hendleMakeComplete = (id) => {


    const completeOrder = async (id) => {
      try {
        let newStatus = 'incomplete';

        if (currentStatus === 'incomplete') {
          alert("you can't make it, untel your technician accept and complete your order ");
        }
        else if (currentStatus === 'rejected') {
          alert("it's rejected order, you can't make it complete order");

        }
        else if (currentStatus === 'pending') {
          newStatus = 'completed';
          await axios.put(`service-orders/${id}/change-status/`, { status: newStatus });
        }
        else {
          alert("it's complete order");
        }
        // else if (currentStatus === 'pending') {

        //   newStatus = 'completed';
        //   await axios.put(`service-orders/${id}/change-status/`, { status: newStatus });

        // }


        // setStatus(newStatus);
        // if (newStatus === 'completed') {
        //   alert("It's complete!");
        // }
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };

    confirm({
      title: 'Are you sure Accept this order?',
      icon: <ExclamationCircleFilled />,
      content: 'By click Yes, you comferm as your order is complete',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        completeOrder(id);
        // navigate('/order')
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    // fetchOrderData()
  }


  return (
    <div>
      <div className='row '>
        <div className='col-md-10 d-flex justify-content-center'>
          <span
            style={{
              position: 'absolute',
              top: '80px',
              zIndex: 1000,
              fontSize: '20px',
            }}
          >Select a Technician to work with based on their location: </span>
        </div>
      </div>
      {/* Render the MapContainer only if the order data has been fetched */}
      {order && Object.keys(order).length > 0 && (
        <MapContainer center={[-6.163, 39.198]} zoom={10} style={{ height: '700px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="Map data © OpenStreetMap contributors"
          />
          <Marker key={order.id} position={order.position} icon={icon}>
            <Popup>
              <div className='cellWithImg'>
                <img className='cellImg' src={order.techUser.photo} alt="img_error" />
                Hi, i am {order.techUser.first_name}, <br />
                i need your technical help ,<br />
                in {order.order_date}<br />
              </div>
              <div className='row py-1'>
                {(role === 'admin' || role === 'customer') &&
                  <div className='col-md-4'>
                    <Button onClick={() => showDeleteConfirm(order.id)}>Delete</Button>
                  </div>
                }

                {((role === 'customer') && (order.status === 'pending')) &&
                  <div className='col-md-4'>
                    <Button onClick={() => hendleMakeComplete(order.id)}>Complete Order</Button>
                  </div>
                }

                {((role === 'technician') && (order.status === 'incomplete')) &&
                  <>
                    <div className='col-md-4'>
                      <Button onClick={() => handleAccept(order.id)}>Accept</Button>
                    </div>
                    <div className='col-md-4'>
                      <Button onClick={() => handleReject(order.id)}>Reject</Button>
                    </div>
                  </>

                }


              </div>
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default ViewOnMap;
