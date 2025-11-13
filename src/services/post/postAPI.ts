import apiClient from '@/services/api/apiClient';

export const postsAPI = {

  async getAll() {
    const response = await apiClient.get(`/posts`);
    return response.data;
  },

  async getPublicPaginated(page = 1, limit = 10) {
    const res = await apiClient.get(`/posts?page=${page}&limit=${limit}`);
    return res.data;
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
