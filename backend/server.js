const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { Server } = require('socket.io');
require('dotenv').config();

const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();
const server = http.createServer(app);

// Connect Database
connectDB();

// Security & Middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

// Static uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Socket.io for Real-time alerts and notifications
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('join_user_room', (userId) => {
    if (userId) socket.join(`user_${userId}`);
  });
  socket.on('disconnect', () => {});
});

// Attach io to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Mount Main API routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    brand: 'Sri Matrimony',
    tagline: 'Trusted Tamil Matrimony',
    status: 'API operational',
    healthEndpoint: '/api/health',
    bootstrapEndpoint: '/api/app/bootstrap',
  });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[API Server Error]:', err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

server.listen(PORT, HOST, () => {
  console.log(`=======================================================`);
  console.log(` SRI MATRIMONY BACKEND SERVER RUNNING ON ${HOST}:${PORT}`);
  console.log(` REST API: http://${HOST}:${PORT}/api`);
  console.log(` Health Check: http://${HOST}:${PORT}/api/health`);
  console.log(` Bootstrap: http://${HOST}:${PORT}/api/app/bootstrap`);
  console.log(`=======================================================`);
});
