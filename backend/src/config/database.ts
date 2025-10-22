import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  // Skip MongoDB connection for local development with mock data
  console.log('⚠️  Skipping MongoDB connection - using mock data mode');
  console.log('💡 To use real database, install MongoDB or use Docker');
  return Promise.resolve();
};

export default connectDB;
