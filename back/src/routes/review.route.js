const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/ReviewController.js');
const tokenMiddleware = require('../middlewares/token.middleware.js');
router.post('/create',tokenMiddleware.authenticateToken, reviewController.createReview);
router.get('/:movieId', reviewController.getReviews);
router.get('/detail/:id', reviewController.getDetailByID);
router.delete('/delete/:id',tokenMiddleware.authenticateToken, reviewController.deleteReview);
module.exports = router;
