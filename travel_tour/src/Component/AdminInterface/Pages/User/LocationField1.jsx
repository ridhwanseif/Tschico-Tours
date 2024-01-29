import React, { useState } from 'react';
import axios from 'axios';

function LocationField1() {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setAddress(value);

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          value
        )}&countrycodes=TZ&accept-language=en&bounded=1&viewbox=39.0,-7.0,40.0,-6.0`
      );
      const data = response.data;
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setCoordinates({ lat, lon });
        setError('');
      } else {
        setCoordinates(null);
        setError('Location not found in Zanzibar');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input type="text" value={address} onChange={handleInputChange} placeholder="Enter a location" />

      {error && <p>{error}</p>}

      {coordinates && (
        <div>
          <h3>Coordinates:</h3>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lon}</p>
        </div>
      )}
    </div>
  );
}

export default LocationField1;