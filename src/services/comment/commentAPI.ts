import apiClient from "@/services/api/apiClient";
import type { Comment } from "@/types/comment";

export const commentsAPI = {

  getByPost: async (postId: string) => {
    const res = await apiClient.get<Comment[]>(`/comments/post/${postId}`);
    return res.data;
  },

  create: async (data: { postId: string; content: string; parentId?: string; userId: string; }) => {
    const res = await apiClient.post<Comment>("/comments", data);
    return res.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/comments/${id}`);
  },
};
