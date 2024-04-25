const ProductRating = require('../models/productRatingModel');
const { CustomError } = require('../utils/error');

async function rateProduct(userId, productId, rating, review = '') {
    // Check if the user has already rated the product
    const existingRating = await ProductRating.findOne({ userId, productId });
    if (existingRating) {
        existingRating.rating = rating;
        existingRating.review = review;
        existingRating.createdAt = new Date();
        return await existingRating.save();
    }
    else
    {
        // Create a new rating
        const newRating = new ProductRating({ userId, productId, rating, review });
        return await newRating.save();
    }
}

async function updateRating(userId, productId, rating, review = '') {
    // Find and update the existing rating
    const existingRating = await ProductRating.findOne({ userId, productId });
    if (!existingRating) {
        throw new CustomError('Rating not found', 404);
    }
    existingRating.rating = rating;
    existingRating.review = review;
    existingRating.createdAt = new Date();
    return await existingRating.save();
}

async function getProductRating(productId) {
    // Get all ratings for the product
    const ratings = await ProductRating.find({ productId });
    if (!ratings || ratings.length === 0) {
        return { totalRatings: 0, totalReviews: 0, averageRating: 0, reviews: [] };
    }
    const totalRatings = ratings.length;
    const totalReviews = ratings.filter(rating => rating.review).length;
    const sumOfRatings = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    const averageRating = sumOfRatings / totalRatings;
    const reviews = ratings.map(rating => ({
        userId: rating.userId,
        review: rating.review
    }));
    return { totalRatings, totalReviews, averageRating, reviews };
}

module.exports = {
    rateProduct,
    updateRating,
    getProductRating
};
