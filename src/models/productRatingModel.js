const mongoose = require('mongoose');

const productRatingSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    userId: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

const ProductRating = mongoose.model('ProductRating', productRatingSchema);
module.exports = ProductRating;
