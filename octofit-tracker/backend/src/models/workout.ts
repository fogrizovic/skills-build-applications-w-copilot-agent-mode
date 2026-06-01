import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  exercises: { name: string; reps?: number; durationSeconds?: number }[];
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const WorkoutSchema: Schema = new Schema<IWorkout>({
  name: { type: String, required: true },
  exercises: [
    {
      name: { type: String, required: true },
      reps: { type: Number },
      durationSeconds: { type: Number },
    },
  ],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
