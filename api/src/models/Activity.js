const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    sequelize.define('activity',{
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Dificultad: {
            type: DataTypes.INTEGER,            
            validator: {
                min: 1,
                max: 5
            },
            defaultValue: 3
        },
        Duracion: {
            type:DataTypes.STRING,
            defaultValue: 'Relativo según el usuario.'
        },
        Temporada: {
            type: DataTypes.STRING,
            validator: {
                isIn: [['Verano','Otoño','Invierno','Primavera']]
            }
        }
    },
    )
}
