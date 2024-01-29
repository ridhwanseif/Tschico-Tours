// // import React from 'react'
// // import UserAppBar from '../../component/Nav/UserAppBar/UserAppBar'
// // import UserNavBar from '../../component/Nav/UserNavBar/UserNavBar'
// // import { Layout, Space } from 'antd';
// // import MapField from './LocationField';


// // const { Sider, Content } = Layout;
// // export default function NewCustomer() {
// //   return (
// //     <div className='home'>

// //     <Space
// //         direction="vertical"
// //         style={{
// //             width: '100%',
// //         }}
// //         size={[0, 48]}
// //     >
// //         <div className='homeContainer'>

// //             <Layout>
// //                 <Sider>
// //                     <UserNavBar />
// //                 </Sider>
// //                 <Layout>
// //                     <UserAppBar />
// //                     <Content className='scrowll'>
// //                     <MapField/>
// //                     </Content>
// //                 </Layout>

// //             </Layout>
// //         </div>

// //     </Space>
// // </div>
// //   )
// // }


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
//           longitude - 0.005,
//           latitude - 0.005,
//           longitude + 0.005,
//           latitude + 0.005,
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
//       center={position || [49.1951, 16.6068]}
//       zoom={position ? 13 : 18} // Zoom level 3 as fallback if location not available
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

// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// const MapComponent = () => {
//   const markerLocations = [
//     { id: 1, latitude: 51.505, longitude: -0.09 },
//     { id: 2, latitude: 51.51, longitude: -0.1 },
//     { id: 3, latitude: 51.515, longitude: -0.12 },
//     { id: 4, latitude: 51.502, longitude: -0.11 },
//     { id: 5, latitude: 51.505, longitude: -0.1 }
//   ];

//   return (
//     <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px' }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="Map data © OpenStreetMap contributors" />

//       {markerLocations.map(marker => (
//         <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
//           <Popup>Marker {marker.id}</Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default MapComponent;


// technician location
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import icon from "./constants";
import { Button } from 'rsuite';


const MapComponent = () => {
  const markerLocations = [
    { id: 1, position: [-6.1352373119125785, 39.25387776464775], streetAddress: 'Street 1' },
    { id: 2, position: [-6.168604089664149, 39.43349247609658], streetAddress: 'Street 2' },
    { id: 3, position: [-6.306134623534267, 39.27870534490551], streetAddress: 'Street 3' },
    { id: 4, position: [-6.005836283404984, 39.201911068182945], streetAddress: 'Street 4' },
    { id: 5, position: [-5.814062099770871, 39.22494078900032], streetAddress: 'Street 5' },
    { id: 6, position: [-5.7299059526462965, 39.29274577118103], streetAddress: 'Street 6' }

  ];

  // Custom icon definition
  const customIcon = L.icon({
    iconUrl: 'path/to/custom/icon.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });

  return (
    <div>
      <span
        style={{
          position: "absolute",
          top: "10px",
          left: "50px",
          zIndex: 1000,
          backgroundColor: "white",
          padding: "5px",
          fontSize: "20px"
        }}
      >
        Select a Technician to wark with base on there location:
      </span>
      <MapContainer center={[-6.163, 39.198]} zoom={10} style={{ height: '700px' }}>
        <span style={{ index: '3' }}>select a Technician to wark with</span>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data © OpenStreetMap contributors"
        />

        {markerLocations.map(marker => (
          <Marker key={marker.id} position={marker.position} icon={icon}>
            <Popup>
              You are here. <br />
              Street: {marker.streetAddress} <br />
              Latitude: {marker.position[0]} <br />
              Longitude: {marker.position[1]}<br />
              <Button>Make Order</Button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
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