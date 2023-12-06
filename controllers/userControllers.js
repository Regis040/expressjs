const { User } = require('../db/sequelizeSetup')

const findAllUsers = (req, res) => {
    User.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findUserByPk = (req, res) => {
    User.findByPk((parseInt(req.params.id)))
        .then((result) => {
            if (result) {
                res.json({ message: 'Un utilisateur a été trouvé.', data: result })
            } else {
                res.status(404).json({ message: `Aucun utilisateur n'a été trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const createUser =(req, res) => {
    const newUser = { ...req.body }

    User.create(newUser)
        .then((user) => {
            res.json({ message: `Le compte de l'utilisateur a bien été créé`, data: user })
            console.log(user)
        })
        .catch((error) => {
            res.status(500).json({ message: `Le compte de l'utilisateur n'a pas pu être créé`, data: error.message })
        })
}

const updateUser = (req, res) => {
    User.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                result.update(req.body)
                    .then(() => {
                        res.json({ message: `Le compte de l'utilisateur a bien été mis à jour.`, data: result })
                    })
                    .catch(error => {
                        res.status(500).json({ message: 'La mise à jour a échoué.', data: error.message })
                    })
            } else {
                res.status(404).json({ message: `Aucun utilisateur n'a été mis à jour.` })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const deleteUser = (req, res) => {
    // A. On vérifie que l'id passé en req.params.id renvoie bien une ligne de notre table.
    User.findByPk(req.params.id)
        .then((result) => {
            // B. Si un coworking correspond à l'id alors on exécute la méthode destroy()
            if (result) {
                result.destroy()
                    // C. Si le coworking est bien supprimé, on affiche un message avec comme data le coworking récupéré dans le .findByPk()
                    .then((result) => {
                        res.json({ mesage: `L'utilisateur a bien été supprimé.`, data: result })
                    })
                    // D. Si la suppression a échoué, on retourne une réponse à POSTMAN
                    .catch((error) => {
                        res.status(500).json({ mesage: `La suppression de l'utilisateur a échoué.`, data: error.message })
                    })
            } else {
                // B Si aucun coworking ne correspond à l'id alors on retourne une réponse à POSTMAN
                res.status(404).json({ mesage: `Aucun utilisateur a été trouvé.` })
            }
        })
        .catch((error) => {
            // E. Si une erreur est survenue dès le findByPk, on retourne une réponse à POSTMAN
            res.status(500).json({ mesage: `La requête n'a pas aboutie.` })
        })
}

module.exports = { findAllUsers, findUserByPk, createUser, updateUser, deleteUser }