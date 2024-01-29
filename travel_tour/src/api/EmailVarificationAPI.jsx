export const fetchExcursionById = async (toursId) => {
    try {
      const response = await axios.get(`excursion/rud/${toursId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }