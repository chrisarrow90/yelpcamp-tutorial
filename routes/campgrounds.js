const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, isValidCampground } = require('../middleware');
const multer = require('multer'); // for handling multipart/form-data (uploading files)
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router
  .route('/')
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array('image'),
    isValidCampground,
    catchAsync(campgrounds.createCampground)
  );

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router
  .route('/:id')
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array('image'),
    isValidCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;
