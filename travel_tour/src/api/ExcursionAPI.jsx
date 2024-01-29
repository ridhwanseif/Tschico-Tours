import axios from './axios';


export const fetchExcursions = async () => {
  const response = await axios.get('excursions/');
  return response.data;
};

export const fetchExcursionsPhotos = async () => {
  const response = await axios.get('excursionPhotos/');
  return response.data;
};

export const deleteExcursionPhoto = async (photoId) => {
  await axios.delete(`excursionPhoto/rud/${photoId}/`);
};


export const fetchExcursionById = async (toursId) => {
  try {
    const response = await axios.get(`excursion/rud/${toursId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const createExcursion = async (tour) => {
  const response = await axios.post('excursion/create', tour);
  return response.data;
};

export const createExcursionPhoto = async (photo) => {
  const response = await axios.post('excursionPhoto/create', photo);
  return response.data;
};

export const updateExcursion = async (tourId, tour) => {
  const response = await axios.put(`excursion/rud/${tourId}/`, tour);
  return response.data;
};

export const deleteExcursion = async (tourId) => {
  await axios.delete(`excursion/rud/${tourId}/`);
};
