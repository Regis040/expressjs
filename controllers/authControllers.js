const { User, Role, Coworking } = require('../db/sequelizeSetup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = require('../configs/tokenData')

const login = (req, res) => {
    // A. On vérifie que l'utilisateur qui tente de se connecter existe bel et bien dans notre BDD
    User.findOne({ where: { username: req.body.username } })
        .then((result) => {
            // B. Si l'utilisateur n'existe pas, on renvoie une réponse erreur Client
            if (!result) {
                return res.status(404).json({ message: `Le nom d'utilisateur n'existe pas.` })
            }

            bcrypt.compare(req.body.password, result.password)
                .then((isValid) => {
                    if (!isValid) {
                        return res.status(401).json({ message: `Le mot de passe n'est pas valide.` })
                    }
                    const token = jwt.sign({
                        data: result.username
                    }, SECRET_KEY, { expiresIn: '1h' });

                    // res.cookie('coworkingapi_jwt', token) // cookie style
                    // res.json({ message: `Login réussi`, data: token })
                })
                .catch(error => {
                    console.log(error.message)
                })
        })
        .catch((error) => {
            res.status(500).json({ data: error.message })
        })
}

const protect = (req, res, next) => {
    // console.log(req.headers)
    console.log(req.headers.authorization)
    if (!req.headers.authorization) {
        return res.status(401).json({ message: `Vous n'êtes pas authentifié.` })
    }
    const token = req.headers.authorization.split(' ')[1]
    
    // Possibilité de stocker le jwt dasn un cookie côté client
    // if (!req.cookies.coworkingapi_jwt) {
    //     return res.status(401).json({ message: `Vous n'êtes pas authentifié.` })
    // }

    // const token = req.cookies.coworkingapi_jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.username = decoded.data // username est une propriété
            next()
        } catch (error) {
            return res.status(403).json({ message: `Le token n'est pas valide.` })
        }
    }
}

// implémenter le middleware pour interdire l'accès aux utilisateurs non admin
const restrict = (req, res, next) => {
    User.findOne({
        where: {
            username: req.username
        }
    })
        .then(user => {
            Role.findByPk(user.RoleId)
                .then(role => {
                    if (role.label === 'admin') {
                        next()
                    } else {
                        res.status(403).json({ message: `Droits insuffisants` })
                    }
                })
                .catch(error => {
                    console.log(error.message)
                })
        })
        .catch(error => {
            console.log(error)
        })
}

// Implémenter le middleware qui sera utilisé sur updateCoworking et deleteCoworking, qui permmettra d'interagir sur la ressource seulement si on en est l'auteur. Si ce n'est pas le cas, on renvoie une erreur 403.
const restrictToOwnUser = (req, res, next) => {
    User.findOne(
        {
            where:
                { username: req.username }
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `Pas d'utilisateur trouvé.` })
            }
            Coworking.findByPk(req.params.id)
                .then(coworking => {
                    if (!coworking) return res.status(404).json({ message: `La ressource n'existe pas.` })
                    if (user.id === coworking.UserId) {
                        next()
                    } else {
                        res.status(403).json({ message: `Vous n'êtes pas l'auteur de la ressource.` })
                    }
                })
                .catch(error => {
                    return res.status(500).json({ message: error.message })
                })
        })
        .catch(error => console.log(error.message))
}

module.exports = { login, protect, restrict, restrictToOwnUser }






















