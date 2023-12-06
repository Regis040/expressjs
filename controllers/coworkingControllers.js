// const { Op } = require('sequelize')
const { UniqueConstraintError, ValidationError } = require('sequelize')
const { Coworking } = require('../db/sequelizeSetup')
const jwt = require('jsonwebtoken')

const findAllCoworkings = (req, res) => {
    Coworking.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findCoworkingByPk = (req, res) => {
    Coworking.findByPk((parseInt(req.params.id)))
        .then((result) => {
            if (result) {
                res.json({ message: 'Un coworking a été trouvé.', data: result })
            } else {
                res.status(404).json({ message: `Aucun coworking n'a été trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const createCoworking = (req, res) => {
    // console.log(req.headers.authorization)
    if (!req.headers.authorization) {
        // Erreur 401 car l'utilisateur n'est pas authentifié
        return res.status(401).json({ message: `Vous n'êtes pas authentifié.` })
    }

    const token = req.headers.authorization.split(' ')[1]

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret_key');
            console.log(decoded);
        } catch (error) {
            return res.status(403).json({ message: `Le token n'est pas valide.` })
        }
    }
    const newCoworking = { ...req.body }

    Coworking.create(newCoworking)
        .then((coworking) => {
            res.status(201).json({ message: 'Le coworking a bien été créé', data: coworking })
        })
        .catch((error) => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: `Le coworking n'a pas pu être créé`, data: error.message })
        })
}

const updateCoworking = (req, res) => {
    Coworking.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.update(req.body)
                    .then(() => {
                        res.status(201).json({ message: 'Le coworking a bien été mis à jour.', data: result })
                    })
            } else {
                res.status(404).json({ message: `Aucun coworking à mettre à jour n'a été trouvé.` })
            }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const deleteCoworking = (req, res) => {
    // A. On vérifie que l'id passé en req.params.id renvoie bien une ligne de notre table.
    Coworking.findByPk(req.params.id)
        .then((result) => {
            // B. Si un coworking correspond à l'id alors on exécute la méthode destroy()
            if (result) {
                return result.destroy()
                    // C. Si le coworking est bien supprimé, on affiche un message avec comme data le coworking récupéré dans le .findByPk()
                    .then((result) => {
                        res.json({ mesage: `Le coworking a bien été supprimé.`, data: result })
                    })
            } else {
                // B Si aucun coworking ne correspond à l'id alors on retourne une réponse à POSTMAN
                res.status(404).json({ mesage: `Aucun coworking trouvé.` })
            }
        })
        .catch((error) => {
            // E. Si une erreur est survenue dès le findByPk, on retourne une réponse à POSTMAN
            res.status(500).json({ mesage: `La requête n'a pas aboutie.`, data: error.message })
        })
}

module.exports = { findAllCoworkings, findCoworkingByPk, createCoworking, updateCoworking, deleteCoworking }