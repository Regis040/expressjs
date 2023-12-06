const { Coworking } = require('../db/sequelizeSetup')

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

const createCoworking =(req, res) => {
    const newCoworking = { ...req.body }

    Coworking.create(newCoworking)
        .then((coworking) => {
            res.status(201).json({ message: 'Le coworking a bien été créé', data: coworking })
            console.log(coworking)
        })
        .catch((error) => {
            res.status(500).json({ message: `Le coworking n'a pas pu être créé`, data: error.message })
        })
}
const updateCoworking = (req, res) => {
    Coworking.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                result.update(req.body)
                    .then(() => {
                        res.status(201).json({ message: 'Le coworking a bien été mis à jour.', data: result })
                    })
                    .catch(error => {
                        res.status(500).json({ message: 'La mise à jour a échoué.', data: error.message })
                    })
            } else {
                res.status(404).json({ message: `Aucun coworking n'a été mis à jour.` })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const deleteCoworking = (req, res) => {
    // A. On vérifie que l'id passé en req.params.id renvoie bien une ligne de notre table.
    Coworking.findByPk(req.params.id)
        .then((result) => {
            // B. Si un coworking correspond à l'id alors on exécute la méthode destroy()
            if (result) {
                result.destroy()
                    // C. Si le coworking est bien supprimé, on affiche un message avec comme data le coworking récupéré dans le .findByPk()
                    .then((result) => {
                        res.json({ mesage: `Le coworking a bien été supprimé.`, data: result })
                    })
                    // D. Si la suppression a échoué, on retourne une réponse à POSTMAN
                    .catch((error) => {
                        res.status(500).json({ mesage: `La suppression a échoué.`, data: error.message })
                    })
            } else {
                // B Si aucun coworking ne correspond à l'id alors on retourne une réponse à POSTMAN
                res.status(404).json({ mesage: `Aucun coworking trouvé.` })
            }
        })
        .catch((error) => {
            // E. Si une erreur est survenue dès le findByPk, on retourne une réponse à POSTMAN
            res.status(500).json({ mesage: `La requête n'a pas aboutie.` })
        })
}

module.exports = { findAllCoworkings, findCoworkingByPk, createCoworking, updateCoworking, deleteCoworking }