import mongoose, { Schema } from 'mongoose';
import { INotification } from './interfaces';

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['like', 'comment'], required: true },
    contentId: { type: Schema.Types.ObjectId, ref: 'Content', required: true },
    initiator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true, 
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

NotificationSchema.virtual('id').get(function () {
  return this._id.toHexString();
});


const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
export default Notification;
