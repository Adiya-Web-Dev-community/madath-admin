require('dotenv').config();
const express = require('express');
// const mongoose = require('mongoose');
const Pusher = require('pusher');

// Initialize Pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

// Initialize Express
const router = express.Router();



// Endpoint to create a booking
router.post('/bookings', async (req, res) => {
  try {
    pusher.trigger('booking-channel', 'new-booking', req.body);
    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router

