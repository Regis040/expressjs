const CoworkingModel = require('../models/coworkingModel')
const UserModel = require('../models/userModel')
const RoleModel = require('../models/roleModel')
const { Sequelize, DataTypes } = require('sequelize');
const { setCoworkings, setUsers, setRoles } = require('./setDataSample')

const sequelize = new Sequelize('bordeaux_coworkings', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

const Role = RoleModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Coworking = CoworkingModel(sequelize, DataTypes)

Role.hasMany(User)
User.belongsTo(Role)

User.hasMany(Coworking)
Coworking.belongsTo(User)

sequelize.sync({ force: true })
    .then(() => {
        // setCoworkings(Coworking)
        setUsers(User)
        setRoles(Role)
    })
    .catch(error => {
        console.log(error)
    })


sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))


module.exports = { Coworking, User, Role }