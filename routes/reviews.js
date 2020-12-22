const express = require('express');
const router = express.Router({ mergeParams: true }); // reqd to get params from the app.js route
const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');
const { isValidReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');

router.post('/', isLoggedIn, isValidReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
