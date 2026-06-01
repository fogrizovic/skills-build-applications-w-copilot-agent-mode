/**
 * Seed the octofit_db database with test data
 *
 * Run with: `npx ts-node src/scripts/seed.ts` (from backend folder)
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Workout from '../models/workout';
import Leaderboard from '../models/leaderboard';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGODB_URI);

  // Clear existing
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  // Users
  const users = await User.create([
    { name: 'Ava Thompson', email: 'ava@example.com' },
    { name: 'Liam Patel', email: 'liam@example.com' },
    { name: 'Maya Garcia', email: 'maya@example.com' },
    { name: 'Noah Kim', email: 'noah@example.com' },
    { name: 'Zoe Martin', email: 'zoe@example.com' },
  ]);

  // Teams
  const teamAlpha = await Team.create({ name: 'Alpha Runners', memberIds: [users[0]._id, users[1]._id] });
  const teamBeta = await Team.create({ name: 'Beta Lifters', memberIds: [users[2]._id, users[3]._id, users[4]._id] });

  // Workouts
  const workouts = await Workout.create([
    {
      name: 'Full Body Blast',
      exercises: [
        { name: 'Push Ups', reps: 20 },
        { name: 'Squats', reps: 30 },
        { name: 'Plank', durationSeconds: 60 },
      ],
      createdBy: users[0]._id,
    },
    {
      name: 'Quick Cardio',
      exercises: [
        { name: 'Jumping Jacks', durationSeconds: 60 },
        { name: 'High Knees', durationSeconds: 45 },
      ],
      createdBy: users[2]._id,
    },
  ]);

  // Activities
  const activities = [] as any[];
  activities.push(
    ...(await Activity.create([
      { userId: users[0]._id, type: 'run', durationMinutes: 30, calories: 320 },
      { userId: users[1]._id, type: 'bike', durationMinutes: 45, calories: 540 },
      { userId: users[2]._id, type: 'weights', durationMinutes: 60, calories: 420 },
      { userId: users[3]._id, type: 'yoga', durationMinutes: 40, calories: 180 },
      { userId: users[4]._id, type: 'hiit', durationMinutes: 25, calories: 300 },
    ])),
  );

  // Leaderboard
  await Leaderboard.create([
    { subjectType: 'team', subjectId: teamAlpha._id, points: 1240 },
    { subjectType: 'team', subjectId: teamBeta._id, points: 980 },
    { subjectType: 'user', subjectId: users[0]._id, points: 620 },
    { subjectType: 'user', subjectId: users[1]._id, points: 620 },
    { subjectType: 'user', subjectId: users[2]._id, points: 490 },
  ]);

  console.log('Seeding completed.');
  console.log(`Inserted ${users.length} users, 2 teams, ${workouts.length} workouts, ${activities.length} activities.`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeding failed', err);
  process.exit(1);
});
