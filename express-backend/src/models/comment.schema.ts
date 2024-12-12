import mongoose, { Schema } from 'mongoose';
import { IComment } from './interfaces';

const CommentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    parentComment: { type: Schema.Types.ObjectId, ref: 'Comment' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  },
);

CommentSchema.virtual('id', { id: this._id });
const Comment = mongoose.model<IComment>('Comment', CommentSchema);
export default Comment;
