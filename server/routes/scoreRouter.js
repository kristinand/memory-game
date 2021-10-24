const express = require('express');
const scoreController = require('../controllers/scoreController');

const router = express.Router();

router.route('/').get(scoreController.getAllRatings).put(scoreController.saveRating);
router.route('/:id').get(scoreController.getRating).delete(scoreController.deleteRating);

module.exports = router;
