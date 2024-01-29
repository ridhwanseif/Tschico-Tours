import axios from './axios';


export const fetchPosts = async () => {
  const response = await axios.get('posts/');
  return response.data;
};

export const fetchPostById = async (postId) => {
  try {
    const response = await axios.get(`post/rud/${postId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const createPost = async (post) => {
  const response = await axios.post('post/create', post);
  return response.data;
};

export const updatePost = async (postId, post) => {
  const response = await axios.put(`post/rud/${postId}/`, post);
  return response.data;
};

export const deletePost = async (postId) => {
  await axios.delete(`post/rud/${postId}/`);
};
