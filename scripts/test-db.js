#!/usr/bin/env node
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

console.log('Testing MongoDB connection to:', uri);

// Short server selection timeout so we fail fast if DB isn't reachable
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
