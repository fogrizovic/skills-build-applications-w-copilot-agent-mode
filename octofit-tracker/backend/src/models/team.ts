import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user';

export interface ITeam extends Document {
  name: string;
  memberIds: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const TeamSchema: Schema = new Schema<ITeam>({
  name: { type: String, required: true },
  memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITeam>('Team', TeamSchema);
