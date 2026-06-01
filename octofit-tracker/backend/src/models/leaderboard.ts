import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  subjectType: 'user' | 'team';
  subjectId: mongoose.Types.ObjectId;
  points: number;
  rank?: number;
}

const LeaderboardSchema: Schema = new Schema<ILeaderboardEntry>({
  subjectType: { type: String, enum: ['user', 'team'], required: true },
  subjectId: { type: Schema.Types.ObjectId, required: true },
  points: { type: Number, default: 0 },
  rank: { type: Number },
});

export default mongoose.model<ILeaderboardEntry>('Leaderboard', LeaderboardSchema);
