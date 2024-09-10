// Import required modules
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Create a new appointment
router.post('/', appointmentController.createAppointment);

// Get all appointments
router.get('/', appointmentController.getAppointments);

// Get an appointment by ID
router.get('/:id', appointmentController.getAppointmentById);

// Update an appointment
router.put('/:id', appointmentController.updateAppointment);

// Delete an appointment
router.delete('/:id', appointmentController.deleteAppointment);

// Export the router
module.exports = router;