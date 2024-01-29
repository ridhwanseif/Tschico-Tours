import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from 'rsuite';
import axios from '../../../../api/axios';
import icon from './constants';
import OrderForm from './OrderForm';
import AuthContext from '../../../../context/AuthProvider';

const ViewAllOnMap = () => {
    const [technician, setTechnicians] = useState([]);
    const [order, setOrder] = useState([]);
    const { auth } = useContext(AuthContext);
    const { role, customer_id, technician_id } = auth;


    //  fetch order
    useEffect(() => {
        fetchOrderData();
    }, []);

    const fetchOrderData = async () => {
        try {
            if (role === 'admin') {
                const response = await axios.get('order-service');
                const formattedOrder = response.data.map(order => {
                    const [longitude, latitude] = order.location
                        .replace('SRID=4326;POINT (', '')
                        .replace(')', '')
                        .split(' ');
                    return {
                        ...order,
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        position: [parseFloat(longitude), parseFloat(latitude)]
                    }
                });
                setOrder(formattedOrder);

            }
            else if (role === 'technician') {
                const response = await axios.get(`order-service/userRole/${technician_id}/`);
                const formattedOrder = response.data.map(order => {
                    const [longitude, latitude] = order.location
                        .replace('SRID=4326;POINT (', '')
                        .replace(')', '')
                        .split(' ');
                    return {
                        ...order,
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        position: [parseFloat(longitude), parseFloat(latitude)]
                    }
                });
                setOrder(formattedOrder);
                console.log(formattedOrder)
            }
            else {
                const response = await axios.get(`order-service/userRole/${customer_id}/`);
                const formattedOrder = response.data.map(order => {
                    const [longitude, latitude] = order.location
                        .replace('SRID=4326;POINT (', '')
                        .replace(')', '')
                        .split(' ');
                    return {
                        ...order,       
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        position: [parseFloat(longitude), parseFloat(latitude)]
                    }
                });
                setOrder(formattedOrder);
                // console.log(formattedOrder)
            }
        } catch (error) {
            console.error(error);
        }
    };
    // end  fetch technicaion


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
                {/* <div className='col-md-2 d-flex justify-content-end'>
          <Button onClick={hendleBack}>Go Back</Button>
        </div> */}
            </div>
            <MapContainer center={[-6.163, 39.198]} zoom={10} style={{ height: '700px' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="Map data © OpenStreetMap contributors"
                />
                {order.map((marker) => (
                    <Marker key={marker.id} position={marker.position} icon={icon}>
                        <Popup>
                            on {marker.order_date},<br />
                            the service need is {marker.description}                           
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default ViewAllOnMap;