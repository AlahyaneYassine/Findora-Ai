const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // import the model

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill all fields.' });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();  // save to MongoDB

    res.status(200).json({ message: 'Message received and saved!' });
  } catch (err) {
    console.error('Error saving contact message:', err);
    res.status(500).json({ error: 'Failed to save message.' });
  }
});

module.exports = router;
