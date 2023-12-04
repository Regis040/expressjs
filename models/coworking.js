// on définit le model coworking qui se traduira par une table avec ses champs dans la BDD
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Coworking', { //   Coworking est le nom de ma table
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.JSON
        },
        address: {
            type: DataTypes.JSON
        },
        superficy: {
            type: DataTypes.INTEGER
        },
        capacity: {
            type: DataTypes.INTEGER
        }
    }
    );
}