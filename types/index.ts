// types/index.ts
export interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
}