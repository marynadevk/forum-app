import { Types } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  avatar: string;
}

export interface IPost extends Document {
  title: string;
  content: string;
  author: Types.ObjectId | IUser;
  createdAt: Date;
  comments: Types.ObjectId[];
  likes: Types.ObjectId[];
  image?: string;
}

export interface IComment extends Document {
  content: string;
  author: Types.ObjectId | IUser;
  post?: Types.ObjectId | IPost;
  parentComment?: Types.ObjectId | IComment;
  comments: Types.ObjectId[];
  createdAt: Date;
  likes: Types.ObjectId[];
}
