import apiClient from '@/services/api/apiClient';

export const postsAPI = {

  async getAll() {
    const response = await apiClient.get(`/posts`);
    return response.data;
  },

  async getById(postId: string) {
    const response = await apiClient.get(`/posts/${postId}`);
    return response.data;
  },

  async getAllByUser(userId: string) {
    const response = await apiClient.get(`/posts/user/${userId}`);
    return response.data;
  },

};
