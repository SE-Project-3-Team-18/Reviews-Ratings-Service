const productRatingService = require('../services/productRatingService');

async function handleRateProduct(req, res, next) {
    try {
        const userId = req.get("X-User-Id");
        const { productId } = req.params;
        const { rating, review } = req.body;
        await productRatingService.rateProduct(userId, productId, rating, review);
        res.status(200).json({ message: 'Product rated successfully' });
    } catch (error) {
        next(error);
    }
}

async function handleUpdateRating(req, res, next) {
    try {
        const userId = req.get("X-User-Id");
        const { productId } = req.params;
        const { rating, review } = req.body;
        await productRatingService.updateRating(userId, productId, rating, review);
        res.status(200).json({ message: 'Rating updated successfully' });
    } catch (error) {
        next(error);
    }
}

async function handleGetProductRating(req, res, next) {
    try {
        const { productId } = req.params;
        const ratingInfo = await productRatingService.getProductRating(productId);
        res.status(200).json(ratingInfo);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    handleRateProduct,
    handleUpdateRating,
    handleGetProductRating
};
