// Import required modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const appointmentRoutes = require('./routes/appointment');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/event-organizer', { useNewUrlParser: true, useUnifiedTopology: true });

// Use CORS
app.use(cors());

// Use JSON parser
app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});