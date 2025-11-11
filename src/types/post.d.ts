export interface Image {
  id: string;
  url: string;
  originalName: string;
  type: "POST" | "COMMENT" | "PROFILE";
}

export interface ContentBlock {
  id?: string;
  type: "paragraph" | "image";
  content?: string;
}

export interface Post {
  id: string;
  title: string;
  content: ContentBlock[];
  createdAt: string;
  images: Image[];
}
