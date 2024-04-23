const express = require('express');
const router = express.Router();
const productRatingController = require('../controllers/productRatingController');

router.post('/rate/:productId', productRatingController.handleRateProduct);
router.put('/update/:productId', productRatingController.handleUpdateRating);
router.get('/get/:productId', productRatingController.handleGetProductRating);

module.exports = router;
