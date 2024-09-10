// Import required modules
const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { title, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const appointment = new Appointment({ title, userId: user._id });
    await appointment.save();
    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error creating appointment' });
  }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('userId');
    res.status(200).json(appointments);
  } catch (err) {
    res.status(400).json({ message: 'Error getting appointments' });
  }
};

// Get an appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointment.findById(id).populate('userId');
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (err) {
    res.status(400).json({ message: 'Error getting appointment' });
  }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    const { title } = req.body;
    appointment.title = title;
    await appointment.save();
    res.status(200).json({ message: 'Appointment updated successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error updating appointment' });
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting appointment' });
  }
};