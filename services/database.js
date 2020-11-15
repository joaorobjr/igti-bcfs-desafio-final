import mongoose from 'mongoose';
import settings from '../config/settings.js';

const options = {
  autoIndex: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

async function connectDB() {
  try {
    await mongoose.connect(settings.db.url, options);
    logger.info('MongoDB is connected');
  } catch (error) {
    logger.error('MongoDB connection unsuccessful, retry after 5 seconds.');
    setTimeout(connectDB, 5000);
  }
}

export default { connectDB };
