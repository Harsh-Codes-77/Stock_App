import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';

const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log('Loaded environment from', envPath);
} else {
  console.log('.env not found at', envPath, '- falling back to existing process.env');
}

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

console.log('Testing MongoDB connection to:', uri);

mongoose
  .connect(uri, { serverSelectionTimeoutMS: 5000, bufferCommands: false })
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      const admin = mongoose.connection.db.admin();
      const res = await admin.ping();
      console.log('Ping result:', res);
    } catch (e) {
      console.warn('Ping failed but connection established:', e && e.message);
    }
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  })
  .catch((err) => {
    console.error('MongoDB connection error:');
    console.error(err);
    process.exit(1);
  });
