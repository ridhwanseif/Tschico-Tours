import axios from './axios';


export const fetchDestinations = async () => {
  const response = await axios.get('destinations/');
  return response.data;
};

export const fetchDestinationAreas = async () => {
  const response = await axios.get('destinationAreas/');
  return response.data;
};

export const fetchDestinationsPhotos = async () => {
  const response = await axios.get('destinationPhotos/');
  return response.data;
};

export const fetchDestinationById = async (destinationId) => {
  try {
    const response = await axios.get(`destination/rud/${destinationId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const fetchDestinationAreaById = async (destinationAreaId) => {
  try {
    const response = await axios.get(`destinationArea/rud/${destinationAreaId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const createDestination = async (destination) => {
  const response = await axios.post('destination/create', destination);
  return response.data;
};

export const createDestinationArea = async (area) => {
  const response = await axios.post('destinationArea/create', area);
  return response.data;
};

export const createDestinationPhoto = async (destination) => {
  const response = await axios.post('destinationPhoto/create', destination);
  return response.data;
};

export const updateDestination = async (destinationId, destination) => {
  const response = await axios.put(`destination/rud/${destinationId}/`, destination);
  return response.data;
};

export const updateDestinationArea = async (destinationId, destination) => {
  const response = await axios.put(`destinationArea/rud/${destinationId}/`, destination);
  return response.data;
};

export const deleteDestination = async (destinationId) => {
  await axios.delete(`destination/rud/${destinationId}/`);
};

export const deleteDestinationPhoto = async (destinationId) => {
  await axios.delete(`destinationPhoto/rud/${destinationId}/`);
};

export const deleteDestinationArea = async (areaId) => {
  await axios.delete(`destinationArea/rud/${areaId}/`);
};
