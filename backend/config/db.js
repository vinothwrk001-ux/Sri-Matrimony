const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sri_matrimony';
  try {
    const conn = await mongoose.connect(mongoURI, {
      autoIndex: true,
      serverSelectionTimeoutMS: 4000,
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`\n[MongoDB Connection Notice]: Could not connect to MongoDB at ${mongoURI}`);
    console.error(`Reason: ${error.message}`);
    console.warn(`[Action Needed]: Sri Matrimony requires MongoDB for full authentication & profile features.`);
    console.warn(`>> If MongoDB Windows Service is installed, run in an Administrator command prompt:`);
    console.warn(`   net start MongoDB`);
    console.warn(`>> Or launch mongod manually with a local data folder:`);
    console.warn(`   mongod --dbpath "backend/data/db"\n`);
  }
};

module.exports = connectDB;
