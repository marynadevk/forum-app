import mongoose, { Schema } from 'mongoose';
import { IPost } from './interfaces';

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    image: { type: String },
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>('Post', PostSchema);
export default Post;