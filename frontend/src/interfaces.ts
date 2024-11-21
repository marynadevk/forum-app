export interface IFormField {
  name: 'username' | 'password' | 'repeatPassword';
  label: string;
  placeholder: string;
}

export interface IUser {
  id: string;
  username: string;
  avatar: string;
}

export interface IUserProfile extends IUser {
  posts: IPost[]
  reactions: number;
}

export interface IPost {
  id: string;
  title: string;
  body: string;
  userId: string;
  user: IUser;
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
