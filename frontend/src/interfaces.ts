export interface IFormField {
  type: string;
  name: 'username' | 'email' | 'password' | 'repeatPassword';
  label: string;
  placeholder: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

export interface IUserProfile extends IUser {
  posts: number;
  impressions: number;
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: IUser;
  image?: string;
  createdAt: Date | string;
  likes?: string[];
  comments?: IComment[];
}

export interface IComment {
  id: string;
  postId: string;
  commentId?: string;
  userId: string;
  user: IUser;
  body: string;
  createdAt: Date | string;
  commentLikes?: string[];
  subComments?: IComment[];
}
