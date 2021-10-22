const express = require('express');
const scoreController = require('../controllers/scoreController');

const router = express.Router();

router.route('/').get(scoreController.getAllRatings).put(scoreController.setRating);
router.route('/:id').delete(scoreController.deleteRating);

module.exports = router;