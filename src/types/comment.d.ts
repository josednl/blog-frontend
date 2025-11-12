export interface Comment {
  id: string;
  content: string;
  postId:    String;
  userId:    String;
  parentId?:  String;
  createdAt: Date;
  user: any;
  replies?: any[];
}
