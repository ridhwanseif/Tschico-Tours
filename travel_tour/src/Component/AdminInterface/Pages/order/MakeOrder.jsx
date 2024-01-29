// technician location
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from '../../../../api/axios';
import icon from './constants';
import Modal1 from '../../../../utils/Modal1';
import OrderForm from './OrderForm';

const MakeOrder = () => {
  const [technician, setTechnicians] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('technicians/criterial');
      const formattedTechnicians = response.data.map(technician => {
        const [longitude, latitude] = technician.location
          .replace('SRID=4326;POINT (', '')
          .replace(')', '')
          .split(' ');
        return {
          ...technician,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          position: [parseFloat(longitude), parseFloat(latitude)]
        }
      });
      console.log(response.data)
      setTechnicians(formattedTechnicians);
    } catch (error) {
      console.error(error);
    }
  };

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
        {technician.map((marker) => (
          <Marker key={marker.id} position={marker.position} icon={icon}>
            <Popup>
              <div className='cellWithImg'>
                <img className='cellImg' src={marker.techUser.photo} alt="img_error" />
                hellow, i'm {marker.techUser.first_name} . <br />
                I live in {marker.techUser.address},<br />
                the service I provide is {marker.service.service_name},<br />
                I am here to help you. <br />
              </div><br />
              <OrderForm 
              tech_id={marker.techUser.id}
              marker_id={marker.id} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MakeOrder;




// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import icon from "./constants";
// import { Button } from 'rsuite';


// const MakeOrder = () => {
//   const markerLocations = [
//     { id: 1, position: [-6.1352373119125785, 39.25387776464775], streetAddress: 'Street 1' },
//     { id: 2, position: [-6.168604089664149, 39.43349247609658], streetAddress: 'Street 2' },
//     { id: 3, position: [-6.306134623534267, 39.27870534490551], streetAddress: 'Street 3' },
//     { id: 4, position: [-6.005836283404984, 39.201911068182945], streetAddress: 'Street 4' },
//     { id: 5, position: [-5.814062099770871, 39.22494078900032], streetAddress: 'Street 5' },
//     { id: 6, position: [-5.7299059526462965, 39.29274577118103], streetAddress: 'Street 6' }

//   ];

//   // Custom icon definition
//   const customIcon = L.icon({
//     iconUrl: 'path/to/custom/icon.png',
//     iconSize: [30, 30],
//     iconAnchor: [15, 30]
//   });

//   return (
//     <div>
//       <span
//         style={{
//           position: "absolute",
//           top: "10px",
//           left: "50px",
//           zIndex: 1000,
//           backgroundColor: "white",
//           padding: "5px",
//           fontSize: "20px"
//         }}
//       >
//         Select a Technician to wark with base on there location:
//       </span>
//       <MapContainer center={[-6.163, 39.198]} zoom={10} style={{ height: '700px' }}>
//         <span style={{ index: '3' }}>select a Technician to wark with</span>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="Map data © OpenStreetMap contributors"
//         />

//         {markerLocations.map(marker => (
//           <Marker key={marker.id} position={marker.position} icon={icon}>
//             <Popup>
//               You are here. <br />
//               Street: {marker.streetAddress} <br />
//               Latitude: {marker.position[0]} <br />
//               Longitude: {marker.position[1]}<br />
//               <Button>Make Order</Button>
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// };

// export default MakeOrder;
// end of technician location


// // customer location 
// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// import icon from "./constants";

// export default function App() {
//   const [position, setPosition] = useState(null);
//   const [bbox, setBbox] = useState([]);
//   const [streetAddress, setStreetAddress] = useState(null);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (location) => {
//         const { latitude, longitude } = location.coords;
//         setPosition([latitude, longitude]);
//         setBbox([
//           longitude - 0.1,
//           latitude - 0.1,
//           longitude + 0.1,
//           latitude + 0.1,
//         ]);
//         reverseGeocode(latitude, longitude);
//       },
//       (error) => {
//         console.log("Error retrieving location:", error);
//       }
//     );
//   }, []);

//   async function reverseGeocode(latitude, longitude) {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//       );
//       const data = await response.json();
//       const address = data.display_name;
//       setStreetAddress(address);
//     } catch (error) {
//       console.log("Error retrieving street address:", error);
//     }
//   }

//   function LocationMarker() {
//     const map = useMap();

//     useEffect(() => {
//       if (position) {
//         map.flyTo(position, map.getZoom());
//         const radius = 10; // Modify this value to set the radius of the circle marker
//         const circle = L.circle(position, { radius });
//         circle.addTo(map);
//       }
//     }, [map, position]);

//     return position === null ? null : (
//       <Marker position={position} icon={icon}>
//         <Popup>
//           You are here. <br />
//           Street: {streetAddress} <br />
//           Map bbox: <br />
//           <b>Southwest lng</b>: {bbox[0]} <br />
//           <b>Southwest lat</b>: {bbox[1]} <br />
//           <b>Northeast lng</b>: {bbox[2]} <br />
//           <b>Northeast lat</b>: {bbox[3]}
//         </Popup>
//       </Marker>
//     );
//   }

//   return (
//     <MapContainer
//       center={position || [-6.165, 39.199]}
//       zoom={position ? 13 : 11} // Zoom level 11 as fallback if location not available
//       scrollWheelZoom
//       style={{ height: "100vh" }}
//     >
//       <TileLayer
//         attribution='&copy; <a href="http://openstreetmap.org/copyight">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {position && <LocationMarker />}
//     </MapContainer>
//   );
// }
// // end of customer location 


// // customer + technician location
// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import icon from "./constants";


// const MapComponent = () => {
//   const [currentPosition, setCurrentPosition] = useState(null);
//   const [distances, setDistances] = useState([]);

//   const markerLocations = [
//     { id: 1, position: [-6.165, 39.199], streetAddress: 'Street 1' },
//     { id: 2, position: [-6.159, 39.198], streetAddress: 'Street 2' },
//     { id: 3, position: [-6.161, 39.194], streetAddress: 'Street 3' },
//     { id: 4, position: [-6.163, 39.197], streetAddress: 'Street 4' },
//     { id: 5, position: [-6.167, 39.201], streetAddress: 'Street 5' }
//   ];

//   // Custom icon definition
//   const customIcon = L.icon({
//     iconUrl: 'path/to/custom/icon.png',
//     iconSize: [30, 30],
//     iconAnchor: [15, 30]
//   });

//   // Calculate distance between two points using Haversine formula
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Radius of the Earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c * 1000; // Convert to meters
//     return distance;
//   };

//   const deg2rad = deg => {
//     return deg * (Math.PI / 180);
//   };

//   // Custom hook to get the user's current position
//   const useCurrentLocation = () => {
//     const map = useMapEvents({
//       locationfound(e) {
//         setCurrentPosition(e.latlng);
//       }
//     });

//     useEffect(() => {
//       map.locate();
//     }, []);

//     return null;
//   };

//   useEffect(() => {
//     if (currentPosition) {
//       const distances = markerLocations.map(marker => {
//         const distance = calculateDistance(
//           currentPosition.lat,
//           currentPosition.lng,
//           marker.position[0],
//           marker.position[1]
//         );
//         return { id: marker.id, distance };
//       });

//       setDistances(distances);
//     }
//   }, [currentPosition]);

//   return (
//     <MapContainer center={[-6.163, 39.198]} zoom={13} style={{ height: '400px' }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="Map data © OpenStreetMap contributors" />

//       {/* Display user's current location */}
//       {currentPosition && (
//         <Marker position={currentPosition}>
//           <Popup>
//             Your Current Location <br />
//             Latitude: {currentPosition.lat.toFixed(6)} <br />
//             Longitude: {currentPosition.lng.toFixed(6)}
//           </Popup>
//         </Marker>
//       )}

//       {/* Display marked locations */}
//       {markerLocations.map(marker => (
//         <Marker key={marker.id} position={marker.position} icon={icon}>
//           <Popup>
//             Street: {marker.streetAddress} <br />
//             Latitude: {marker.position[0]} <br />
//             Longitude: {marker.position[1]} <br />
//             {distances.length > 0 && (
//               <div>
//                 Distance from your location: {distances.find(item => item.id === marker.id).distance.toFixed(2)} meters
//               </div>
//             )}
//           </Popup>
//         </Marker>
//       ))}

//       {/* Hook to get the user's current location */}
//       <useCurrentLocation />
//     </MapContainer>
//   );
// };

// export default MapComponent;
// // end customer + technician location