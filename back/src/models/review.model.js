const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    username: { type: String, required: true },
    movieId: { type: String, required: true },
    text: { type: String, required: true},
    created_at: {
        type: Date,
        default: () => new Date(new Date().getTime() + 7*60*60*1000) 
    },
});

module.exports = mongoose.model('Review', reviewSchema);