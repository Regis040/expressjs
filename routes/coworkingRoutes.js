const express = require('express')
const router = express.Router()
const { Coworking } = require('../db/sequelizeSetup')


router
    .route('/')
    .get((req, res) => {
    
        Coworking.findAll () // findAll te renvoit une promesse: on evnoie toute la table, "findAll" est une méthode, tout comme "create"
        .then((results) => { // système de promesse
            res.json(results)
        })
        .catch(error => {
            res.json(error.message)
        })
    })
    .post((req, res) => {
    
        const newCoworking = {... req.body}
        Coworking.create(newCoworking)
            .then ((coworking) => {
                res.json({message: `Le coworking a bien été créé`, data: coworking})
                console.log(coworking)
            })
            .catch ((error) => {
                res.json({message: `Le coworking n'a pas été ajouté`, data: error.message})
                console.log(error)
            })
        // const result = { message: `Le coworking a bien été ajouté` }
        // res.json(result)
    })

router
    .route('/:id')
    .get((req, res) => {

       let result = Coworking.findByPk(parseInt(req.params.id))
        .then((result) => {
            if(result) {
                res.json({message: "un coworking a été trouvé", data: result})
            } else {
                res.json({message: "Aucun coworking n'a été trouvé"})
            }
            
        })
        .catch(error => {
            res.json({message: "une erreur est survenue", data : error.message})
        })    
})

    .put((req, res) => { // équivalent à update

        Coworking.update ({ ...req.body}, { // req.body est un objet donc pas besoin de le placer entre {} en retitrant le "..."
            where : {
               id : req.params.id  // = ça ne concerne que cette ligen id= ...
            }
        })

        .then (result => { // result est le nombre de lignes affectées
            if(result >0) {
                res.json({message: "Le coworking a bien été mis à jour ", data: result})
            } else {
                res.json({message: "Aucun coworking n'a été mis à jour"})
            }
        })
        .catch (error => {
            res.json({message: "La mise à jour a merdé", data : error.message})
        })
    })

    .delete((req, res) => {
        Coworking.destroy ({
            where : {
               id : req.params.id  
            }
        })
        .then (result => { // result est le nombre de lignes affectées
            if(result > 0) {
                res.json({message: "Le coworking a bien été supprimé", data: result})
            } else {
                res.json({message: "erreeeeeeeeur"})
            }
        })
        .catch (error => {
            res.json({message: "La suppression a échoué", data : error.message})
        })     
    })

module.exports = router