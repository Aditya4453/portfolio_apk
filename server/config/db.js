const mongoose = require('mongoose');

let mongodInstance = null;

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_aditya';

  try {
    // Attempt connecting to the primary Mongo URI with a short serverSelectionTimeoutMS
    await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[MongoDB] Connected to external MongoDB instance at: ${primaryUri}`);
  } catch (err) {
    console.warn(`[MongoDB] Could not connect to external MongoDB (${err.message}). Starting embedded MongoMemoryServer fallback...`);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongodInstance = await MongoMemoryServer.create();
      const inMemoryUri = mongodInstance.getUri();
      await mongoose.connect(inMemoryUri);
      console.log(`[MongoDB] Connected to in-memory MongoDB at: ${inMemoryUri}`);
    } catch (innerErr) {
      console.error(`[MongoDB] Failed to connect to in-memory MongoDB:`, innerErr);
    }
  }

  mongoose.connection.on('error', (err) => {
    console.error(`[MongoDB] Connection error:`, err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn(`[MongoDB] Disconnected.`);
  });
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (mongodInstance) {
    await mongodInstance.stop();
  }
};

module.exports = { connectDB, disconnectDB };
