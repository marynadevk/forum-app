import mongoose, { Schema } from 'mongoose';
import { IUser } from './interfaces';

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

UserSchema.virtual('id', { id: this._id });
const User = mongoose.model<IUser>('User', UserSchema);
export default User;