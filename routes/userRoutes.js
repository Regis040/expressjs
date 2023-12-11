const express = require('express')
const router = express.Router()
const { findAllUsers, findUserByPk, createUser, updateUser, deleteUser } = require(`../controllers/userControllers`)
const { login } = require(`../controllers/authControllers`)
const { protect } = require('../controllers/authControllers')

// const { User} = require('../db/sequelizeSetup')

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
    .put(protect, updateUser)
    .delete(protect, deleteUser)
    
module.exports = router