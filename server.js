// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Import user model
const User = require('./models/user');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:q4k&mRsDCJKTpK7d@hwaccounts.t44cksh.mongodb.net/accounts', { useNewUrlParser: true });

// Create express app
const app = express();

// Enable CORS
app.use(cors());

// Use body-parser middleware
app.use(bodyParser.json());


// Check if the username is already taken
app.get('/api/check-username', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const { username } = req.query;
    const user = await User.findOne({ username });
    if (user) {
      res.status(409).json({ message: 'Sorry, that username is taken.' });
    } else {
      res.status(200).json({ message: 'Username is available.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Check if the email is already taken
app.get('/api/check-email', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({ message: 'Sorry, that email is already registered.' });
    } else {
      res.status(200).json({ message: 'Email is available.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Handle signup
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    //create a jsonwebtoken 
    const token = jwt.sign({ sub: user._id }, 'your-secret-key');
    // Send the token back to the client
    res.status(200).json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

    
    // Start server
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });