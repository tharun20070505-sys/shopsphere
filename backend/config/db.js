const mongoose = require('mongoose');

let mongod = null;

const connectDB = async () => {
  const uri =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    'mongodb://127.0.0.1:27017/shopsphere';

  try {
    // Attempt standard connection with 10s timeout
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.log(`Local MongoDB connection to ${uri} failed: ${err.message}`);
    console.log('Attempting to initialize in-memory/embedded MongoDB server for development...');

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`Embedded MongoDB Connected: ${memoryUri}`);
      return conn;
    } catch (memoryErr) {
      console.error(`Failed to initialize embedded MongoDB: ${memoryErr.message}`);
      throw memoryErr;
    }
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
};

module.exports = { connectDB, disconnectDB };
