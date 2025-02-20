const Astrologer = require('../models/astrologerModel');

// Function to create a new astrologer
const createAstrologer = async (req, res) => {
  try {
    const { name } = req.body;
    const newAstrologer = new Astrologer({ name });
    await newAstrologer.save();
    res.status(201).json({ message: 'Astrologer created successfully', astrologer: newAstrologer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get information about an astrologer
const getAstrologer = async (req, res) => {
  try {
    const astrologerId = req.params.astrologerId;
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res.status(404).json({ error: 'Astrologer not found' });
    }

    res.status(200).json({ astrologer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAstrologer,
  getAstrologer,
};