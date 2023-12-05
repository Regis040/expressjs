const express = require('express')
const router = express.Router()

// const { User} = require('../db/sequelizeSetup')

router
    .route('/')
    .get((req, res) => {        
        res.send("response get");
    })

    .post((req, res) => {
        res.send("response post");
    })

router
    .route('/:id')
    .get((req, res) => {
        res.send("response get id");
    })
    .put((req, res) => {
        res.send("response put");
    })
    .delete((req, res) => {
        res.send("response delete");
    })

module.exports = router