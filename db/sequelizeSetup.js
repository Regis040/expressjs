const CoworkingModel = require('../models/coworkingModel')
const UserModel = require('../models/userModel')
const RoleModel = require('../models/roleModel')
const { Sequelize, DataTypes } = require('sequelize');
const { setCoworkings, setUsers, setRoles, setCustomers, setRegistrations } = require('./setDataSample');
const customerModel = require('../models/customerModel');
const registrationModel = require('../models/registrationModel');
const reviewModel = require('../models/reviewModel');


const sequelize = new Sequelize('bordeaux_coworkings', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

const Role = RoleModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Coworking = CoworkingModel(sequelize, DataTypes)
const Review = reviewModel(sequelize, DataTypes)
const Customer = customerModel(sequelize, DataTypes)
const Registration = registrationModel(sequelize, DataTypes, Coworking, Customer)

Role.hasMany(User)
User.belongsTo(Role)

User.hasMany(Coworking) // definit une clé étrangère
Coworking.belongsTo(User)

//  Pour review ... il y a 2 clés étrangères : userId et CoworkingId
User.hasMany(Review)
Review.belongsTo(User) // la clé étrangère appartient à review

Coworking.hasMany(Review)
Review.belongsTo(Coworking)


// Coworking.belongsToMany(Customer, { through: Registration }); // many to many
// Customer.belongsToMany(Coworking, { through: Registration }); // many to many

sequelize.sync({ force: true })
    .then(async () => {
        await setRoles(Role)
        await setUsers(User)
        await setCoworkings(Coworking)
        // await setCustomers(Customer) // many to many
        // setRegistrations(Registration) // many to many
    })
    .catch(error => {
        console.log(error)
    })


sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))


module.exports = { Coworking, User, Role, Review }