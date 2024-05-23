const responseHandler = require("../handlers/response.handler.js");
const  MovieDB= require("node-themoviedb");
const Review = require('../models/review.model.js');
const options = {
    secure: true, // use https
    defaultLang: "en" // default language for all requests
};
const mdb = new MovieDB(process.env.TMDB_KEY, options);
class ReviewController {
    async getDetailByID(req, res) {
        const agrs = req.params.id;
        try {
            const reviewData = await Review.findById(agrs);
            res.send({success: "true", message: "get successfully", review: reviewData});

        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
    async createReview(req, res) {
        const newReview = req.body;
       // const {movieId, username} =req.params;
        try {
            const review = await Review.create(newReview);
            res.send({success: "true",message: "create successfully",review: review});
        } catch (error) {
            responseHandler.error(res);
        }
    }
    async getReviews(req, res) {
        try {
            const reviews = await Review.find({movieId: req.params.movieId});
            res.send(reviews);
        } catch (error) {
            responseHandler.error(res);
        }
    }
    async deleteReview(req, res) {
        try {
            const review = await Review.findById(req.params.id);

            if (!review) {
            return res.status(404).json({ message: 'Review not found' });
            }

            // Check if the user is the one who created the review
            console.log("req",req.user);
            if (req.user.username !== review.username) {
            return res.status(403).json({ success: "false", message: 'User not authorized' });
            }
            await Review.deleteOne({ _id: req.params.id });

            res.json({ success: 'true', message: 'Review removed' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

}
module.exports = new  ReviewController;