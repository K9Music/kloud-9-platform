import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dbConnect from './lib/mongodb.js';
import Profile from './models/Profile.js';

async function migrate() {
  await dbConnect();
  const filePath = path.resolve('profiles.json');
  if (!fs.existsSync(filePath)) {
    console.error('profiles.json not found!');
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!Array.isArray(data)) {
    console.error('profiles.json must be an array of objects.');
    process.exit(1);
  }
  try {
    await Profile.insertMany(data);
    console.log(`Imported ${data.length} profiles into MongoDB.`);
  } catch (err) {
    console.error('Error importing profiles:', err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

migrate(); 