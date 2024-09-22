import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRouters.js';
import taskRoutes from './routes/taskRoutues.js'
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

//routes
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})