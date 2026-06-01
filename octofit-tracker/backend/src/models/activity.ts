import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  calories: number;
  occurredAt: Date;
}

const ActivitySchema: Schema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, required: true },
  occurredAt: { type: Date, default: Date.now },
});

export default mongoose.model<IActivity>('Activity', ActivitySchema);
