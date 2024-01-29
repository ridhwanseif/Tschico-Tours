import axios from './axios';


export const fetchBooking = async () => {
  const response = await axios.get('booking/');
  return response.data;
};

export const fetchBookingById = async (bookingId) => {
  try {
    const response = await axios.get(`booking/rud/${bookingId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const createBooking = async (booking) => {
  const response = await axios.post('booking/create', booking);
  return response.data;
};

export const updateBooking = async (bookingId, booking) => {
  const response = await axios.put(`booking/rud/${bookingId}/`, booking);
  return response.data;
};

export const deleteBooking = async (bookingId) => {
    await axios.delete(`booking/rud/${bookingId}/`);
  };
  