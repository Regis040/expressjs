// const { Op } = require('sequelize')
const { UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize')
const { Coworking, User, Review, sequelize } = require('../db/sequelizeSetup')

const findAllCoworkings = (req, res) => {
    // paramètre optionnel qui permet d'ajouter les données relatives aux commentaires d'un coworking
    Coworking.findAll({ include: Review })
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findAllCoworkingsRawSQL = (req, res) => {
    sequelize.query("SELECT name,rating FROM coworkings LEFT JOIN reviews ON coworkings.id = reviews.CoworkingId", { type: QueryTypes.SELECT })
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

//sequelize.query("SELECT `Coworking`.`name`,`Reviews`.`rating` AS `rating` FROM `Coworkings` AS `Coworking` LEFT OUTER JOIN `Reviews` AS `Reviews` ON `Coworking`.`id` = `Reviews`.`CoworkingId`", { type: QueryTypes.SELECT })

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
    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `L'utilisateur n'a pas été trouvé.` })
            }
            const newCoworking = { ...req.body, UserId: user.id }

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
        })
        .catch(error => {
            res.status(500).json(error.message)
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

module.exports = { findAllCoworkings, findCoworkingByPk, createCoworking, updateCoworking, deleteCoworking, findAllCoworkingsRawSQL }