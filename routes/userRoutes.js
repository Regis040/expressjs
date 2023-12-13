const express = require('express')
const router = express.Router()
const { findAllUsers, findUserByPk, createUser, updateUser, deleteUser } = require('../controllers/userControllers')
const { login, protect, restrict } = require('../controllers/authControllers')

router
    .route('/')
    .get(findAllUsers)
    .post(createUser)

router
    .route('/login')
    .post(login)

router
    .route('/:id')
    .get(findUserByPk)
    .put(protect, restrict("admin"), updateUser)
    .delete(protect, restrict("superadmin"), deleteUser)

module.exports = router