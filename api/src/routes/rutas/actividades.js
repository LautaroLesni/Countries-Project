const { Router } = require('express');
const { Activity, Country } = require('../../db.js');
const { Op } = require('sequelize')

const router = Router();
router.post('/', async function(req, res, next){
    const {nombre, dificultad, duracion, temporada, paises} = req.body
    try{
        if(!nombre || !dificultad ||!duracion||!temporada){
            res.status(404).send("No se recibieron los datos necesarios")
        }
        const actividad = await Activity.create({Nombre:nombre, Dificultad:dificultad, Duracion:duracion, Temporada:temporada})
        const country = await Country.findAll({where:{ID:{[Op.in]:paises}}})
        actividad.addCountry(country)
        res.status(200).send('Actividad creada correctamente')
    }
    catch(error){
        next(error)
    }
})


/* sequelize.define('activity',{
    ID: {
        type: DataTypes.STRING(3),
        primaryKey: true,

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
            isIn: [['Verano','Otoño','Invierno','Primavera']] */

module.exports = router;