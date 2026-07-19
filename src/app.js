const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const ConnectDB = require('./config/database');
const cors = require('cors');



// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'https://devtinder-frontend-virid.vercel.app',
    credentials: true,
  })
);
app.use(async (req, res, next) => {
  try {
    await ConnectDB();
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database connection failed" });
  }
});



// Routes with /api prefix for Vercel clarity
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');
app.get('/api/test-db', async (req, res) => {
  try {
    const User = require('./models/user');
    const users = await User.find({}).limit(1);
    res.status(200).json({ message: 'DB connected!', sample: users[0] || null });
  } catch (err) {
    res.status(500).json({ message: 'DB not reachable', error: err.message });
  }
});

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);

// Export app for Vercel serverless
module.exports = app;
