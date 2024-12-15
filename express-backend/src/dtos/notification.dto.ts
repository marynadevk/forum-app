import { Types } from 'mongoose';
import { IUser } from '../models/interfaces';

export class NotificationDto {
  userId: string | IUser | Types.ObjectId;
  type: 'like' | 'comment';
  contentId: string | Types.ObjectId;
  initiator: string | { id: string, username: string, avatar: string };
  message: string;
}