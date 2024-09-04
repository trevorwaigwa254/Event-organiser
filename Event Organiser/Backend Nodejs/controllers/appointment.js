const express = require('express');
const router = express.Router();
const Appointment = require('../Models/Appointment');

// GET /appointments
router.get('/', async (req, res) => {
  const userId = req.user._id;
  const appointments = await Appointment.find({ userId });
  res.json(appointments);
});

// POST /appointments
router.post('/', async (req, res) => {
  const { title, date, time } = req.body;
  const appointment = new Appointment({ title, date, time, booked: false, userId: req.user._id });
  await appointment.save();
  res.json({ message: 'Appointment booked successfully' });
});

// PATCH /appointments/:id
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const { title, date, time } = req.body;
  const appointment = await Appointment.findByIdAndUpdate(id, { title, date, time }, { new: true });
  res.json({ message: 'Appointment updated successfully' });
});

// DELETE /appointments/:id
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await Appointment.findByIdAndRemove(id);
  res.json({ message: 'Appointment deleted successfully' });
});

module.exports = router;