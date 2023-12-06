const express = require('express')
const router = express.Router()
// const { Op } = require('sequelize')
const { Coworking } = require('../db/sequelizeSetup')
const {findAllCoworkings, findCoworkingByPk, createCoworking, updateCoworking, deleteCoworking} = require(`../controllers/coworkingControllers`)

router
    .route('/')
    .get(findAllCoworkings)
    .post(createCoworking)

router
    .route('/:id')
    .get(findCoworkingByPk)
    .put(updateCoworking)
    .delete(deleteCoworking)

module.exports = router