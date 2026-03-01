const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const ConnectDB = require('./config/database');
const cors = require('cors');

// Connect MongoDB Atlas
ConnectDB()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Cannot connect database', err));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'https://dev-frontend-tf7d.vercel.app', // NO trailing slash
    credentials: true,
  })
);

// Routes with /api prefix for Vercel clarity
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');

app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/request', requestRouter);
app.use('/api/user', userRouter);

// Export app for Vercel serverless
module.exports = app;
