// Import required modules
const mongoose = require('mongoose');

// Create a schema for the Appointment model
const appointmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Create the Appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Export the Appointment model
module.exports = Appointment;