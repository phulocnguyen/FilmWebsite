const express = require('express');
const router = express.Router();
const personController = require('../controllers/PersonController');


router.get('/:id', personController.getDetails);
router.get('/:id/movie_credits', personController.getMovieCredits);
module.exports = router;