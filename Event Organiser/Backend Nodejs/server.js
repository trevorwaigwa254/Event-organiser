const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/event-management', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the user model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['admin', 'normal'] }
});

userSchema.pre('save', async function(next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

const User = mongoose.model('User', userSchema);

// Define the appointment model
const appointmentSchema = new mongoose.Schema({
  title: String,
  date: Date,
  time: String,
  booked: Boolean,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Middlewares
app.use(express.json());

// Authentication and authorization
app.use(async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  req.user = await User.findById(decoded.userId);
  next();
});

// API endpoints
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });
  await user.save();
  res.json({ message: 'User created successfully' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.post('/appointments', async (req, res) => {
  const { title, date, time } = req.body;
  const appointment = new Appointment({ title, date, time, booked: false, userId: req.user._id });
  await appointment.save();
  res.json({ message: 'Appointment booked successfully' });
});

app.get('/appointments', async (req, res) => {
  const appointments = await Appointment.find({ userId: req.user._id });
  res.json(appointments);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});