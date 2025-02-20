const User = require('../models/userModel');
const Astrologer = require('../models/astrologerModel');

const connectUser = async (req, res) => {
  try {
    const { userId } = req.body;

    // Retrieve user and active astrologers
    const user = await User.findById(userId);
    const astrologers = await Astrologer.find({ status: 'active' });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (astrologers.length === 0) {
      return res.status(404).json({ error: 'No active astrologers available' });
    }

    // Filter out the astrologers who are not currently handling any user
    const availableAstrologers = astrologers.filter(astrologer => !astrologer.isHandlingUser);

    if (availableAstrologers.length === 0) {
      return res.status(404).json({ error: 'All astrologers are currently busy' });
    }

    // Select a random available astrologer
    const randomIndex = Math.floor(Math.random() * availableAstrologers.length);
    const selectedAstrologer = availableAstrologers[randomIndex];

    // Update the user with the selected astrologer
    user.assignedAstrologerId = selectedAstrologer._id;
    await user.save();

    // Update the selected astrologer to indicate that they are handling a user now
    selectedAstrologer.isHandlingUser = true;
    await selectedAstrologer.save();

    res.status(200).json({ message: 'User connected successfully', user, astrologer: selectedAstrologer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Function to get connected user information
const getConnectUserInfo = async (req, res) => {
  try {
    const { userId } = req.query;

    // Retrieve user information
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Assuming you have a field in the user model to store the connected astrologer ID
    const connectedAstrologerId = user.connectedAstrologer;
    if (!connectedAstrologerId) {
      return res.status(404).json({ error: 'No connected astrologer found for the user' });
    }

    // Retrieve information about the connected astrologer
    const astrologer = await Astrologer.findById(connectedAstrologerId);
    if (!astrologer) {
      return res.status(404).json({ error: 'Connected astrologer not found' });
    }

    res.status(200).json({ user, astrologer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  connectUser,
  getConnectUserInfo,
};