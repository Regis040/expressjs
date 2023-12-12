const { ValidationError } = require('sequelize')
const { Review, User } = require('../db/sequelizeSetup')

const findAllReviews = (req, res) => {
    Review.findAll()
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findReviewByPk = (req, res) => {
    return res.json({ message: `find by pk` })
}

const createReview = (req, res) => {
    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `Utilisateur non trouvé.` })
            }
            return Review.create({ ...req.body, UserId: user.id })
                .then(result => {
                    res.json({ message: `Commentaire créé.`, data: result })
                })
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: error.message })
        })
}

module.exports = { findAllReviews, findReviewByPk, createReview }