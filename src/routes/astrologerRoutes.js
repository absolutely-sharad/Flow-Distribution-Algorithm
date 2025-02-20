const express = require('express');
const router = express.Router();
const astrologerController = require('../controllers/astrologerController');

router.post('/', (req, res) => {
  astrologerController.createAstrologer(req, res);
});

router.get('/:astrologerId', (req, res) => {
  astrologerController.getAstrologer(req, res);
});

module.exports = router;