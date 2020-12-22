const express = require('express');
const router = express.Router({ mergeParams: true }); // reqd to get params from the app.js route
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const { isValidReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');

router.post(
  '/',
  isLoggedIn,
  isValidReview,
  catchAsync(async (req, res) => {
    // find associated campground
    const campground = await Campground.findById(req.params.id);
    // create new review instance
    const review = new Review(req.body.review);
    // assign the id of the logged in user to the review
    review.author = req.user._id;
    // add review into the found campground document
    campground.reviews.push(review);
    // save both review and campground docs
    await review.save();
    await campground.save();
    req.flash('success', 'Your review has been added!');
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  '/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Your review has been deleted!');
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
