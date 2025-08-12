const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Registration Schema
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  destination: String,
  travelers: Number,
  date: Date,
  specialRequests: String,
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model('Registration', registrationSchema);

// Routes
app.get('/api/destinations', (req, res) => {
  res.json([
    {
      id: 1,
      name: "Bali, Indonesia",
      description: "Island paradise with stunning beaches and vibrant culture",
      image: "/bali.jpg"
    },
    {
      id: 2,
      name: "Paris, France",
      description: "The city of lights, art, and culinary excellence",
      image: "/paris.jpg"
    },
    {
      id: 3,
      name: "Kyoto, Japan",
      description: "Ancient temples, traditional gardens, and cherry blossoms",
      image: "/kyoto.jpg"
    }
  ]);
});

app.post('/api/register', async (req, res) => {
  try {
    const newRegistration = new Registration(req.body);
    await newRegistration.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));