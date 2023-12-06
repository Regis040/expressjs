module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Le nom est déjà pris."
            },
        },        
        password: {
            type: DataTypes.STRING,   
            allowNull: false
        },
        email: {
            type: DataTypes.STRING
        },
    });    
}