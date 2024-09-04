const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  title: String,
  date: Date,
  time: String,
  booked: Boolean,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;