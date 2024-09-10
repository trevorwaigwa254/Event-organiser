// Import required modules
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/event-organizer', { useNewUrlParser: true, useUnifiedTopology: true });

// Get the connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Export the connection
module.exports = db;