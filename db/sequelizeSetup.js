const CoworkingModel = require('../models/coworkingModel')
const UserModel = require('../models/userModel')
const RoleModel = require('../models/roleModel')
const { Sequelize, DataTypes } = require('sequelize');
const { setCoworkings, setUsers, setRoles, setCustomers, setRegistrations } = require('./setDataSample');
const customerModel = require('../models/customerModel');
const registrationModel = require('../models/registrationModel');

const sequelize = new Sequelize('bordeaux_coworkings', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

const Role = RoleModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Coworking = CoworkingModel(sequelize, DataTypes)
const Customer = customerModel(sequelize, DataTypes)
const Registration = registrationModel(sequelize, DataTypes, Coworking, Customer)

Role.hasMany(User)
User.belongsTo(Role)

User.hasMany(Coworking)
Coworking.belongsTo(User)

Coworking.belongsToMany(Customer, { through: Registration });
Customer.belongsToMany(Coworking, { through: Registration });

sequelize.sync({ force: true })
    .then(async () => {
        await setRoles(Role)
        await setUsers(User)
        await setCoworkings(Coworking)
        await setCustomers(Customer)
        setRegistrations(Registration)
    })
    .catch(error => {
        console.log(error)
    })


sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))


module.exports = { Coworking, User, Role }