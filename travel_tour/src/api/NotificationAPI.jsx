import axios from './axios';


export const fetchNotification = async () => {
  const response = await axios.get('notification/criterial');
  return response.data;
};

export const fetchNotificationById = async (notificationId) => {
  try {
    const response = await axios.get(`notification/rud/${notificationId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const createNotification = async (notification) => {
  const response = await axios.post('notification/create', notification);
  return response.data;
};

export const updateNotification = async (notificationId, notification) => {
  const response = await axios.put(`notification/rud/${notificationId}/`, notification);
  return response.data;
};

export const deleteNotification = async (notificationId) => {
    await axios.delete(`notification/rud/${notificationId}/`);
  };
  