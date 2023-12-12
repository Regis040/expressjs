// content:string, rating : INTEGER (valeur: entre 0 et 5)
//https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Review', {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            Validate: {
                min: {  
                        msg:"La note ne pas être inférieure à 0", 
                        arg: [0]
                    },
                max: {  
                        msg:"La note ne pas être supéroeure à 5", 
                        arg: [5]
                },
            }
        },
    }
    );
}