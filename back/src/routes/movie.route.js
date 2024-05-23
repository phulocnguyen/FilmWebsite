const express = require('express');
const router = express.Router();
const movieController = require('../controllers/MovieController.js');


router.get('/search', movieController.searchMovie);
router.get('/popular', movieController.getMovieList);
router.get('/videos/:id', movieController.getVideos);
router.get('/images/:id', movieController.getImages);

router.get('/credits/:id', movieController.getCredits);
router.get('/similar/:id', movieController.getSimilar);
router.get('/:id', movieController.infoMovie);
router.get('/images/:id', movieController.getImages);
router.get('/reviews/:id', movieController.getReviews);

router.get('/', movieController.getDiscover);

// router.get('/discovery/movie', movieController.getDiscover);
module.exports = router;