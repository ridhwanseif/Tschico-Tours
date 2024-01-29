import axios from './axios';


export const fetchAbout = async () => {
  const response = await axios.get('abouts/');
  return response.data;
};

export const fetchAboutById = async (aboutId) => {
  try {
    const response = await axios.get(`about/rud/${aboutId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const createAbout = async (about) => {
  const response = await axios.post('about/create', about);
  return response.data;
};

export const updateAbout = async (aboutId, about) => {
  const response = await axios.put(`about/rud/${aboutId}/`, about);
  return response.data;
};

// export const deleteTask = async (taskId) => {
//   await axios.delete(`${BASE_URL}/${taskId}`);
// };
