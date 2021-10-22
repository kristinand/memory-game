const express = require('express');
const scoreController = require('../controllers/scoreController');

const router = express.Router();

router.route('/').get(scoreController.getAllRatings);
router.route('/:id').get(scoreController.createRating).delete(scoreController.deleteRating);

module.exports = router;