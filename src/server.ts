import app from './app.ts';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

if (process.env.PASSWORD === undefined) {
  throw new Error('Missing PASSWORD in .env');
}

const PORT = process.env.PORT || 3000;
const PASSWORD = encodeURIComponent(process.env.PASSWORD);
const MONGO_URI = `mongodb+srv://admin:${PASSWORD}@prod-checklist-asiasout.g2ssiy7.mongodb.net/checklist?retryWrites=true&w=majority&appName=prod-checklist-asiasoutheast2`;

// MongoDB Connection
await mongoose.connect(MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})
.catch(err => console.error('MongoDB connection error: ', err));