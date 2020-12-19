const express = require('express');
const router = express.Router({ mergeParams: true }); // reqd to get params from the app.js route
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { reviewSchema } = require('../joiSchemas.js');
const Campground = require('../models/campground');
const Review = require('../models/review');

// JOI Validation Middleware
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((ele) => ele.message).join(',');
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

router.post(
  '/',
  validateReview,
  catchAsync(async (req, res) => {
    // find associated campground
    const campground = await Campground.findById(req.params.id);
    // create new review instance
    const review = new Review(req.body.review);
    // add review into the found campground document
    campground.reviews.push(review);
    // save both review and campground docs
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  '/:reviewId',
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
