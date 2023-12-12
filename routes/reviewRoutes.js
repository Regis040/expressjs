// findAllCoworkings, findByPk,  create
const express = require('express')
const router = express.Router()
const { findAllReviews, findReviewByPk, createReview } = require('../controllers/reviewControllers')
const { protect, restrict } = require('../controllers/authControllers')

router
    .route('/')
    .get(findAllReviews)
    .post(protect, createReview) // combien de middleware traversés ? 4 ... dans app.js :app.use(express.json), idem avec morgan, route avec app.use (route) et protect

router
    .route('/:id')
    .get(findReviewByPk)
    // .put(protect,  updateCoworking)
    // .delete(protect, deleteCoworking)

module.exports = router