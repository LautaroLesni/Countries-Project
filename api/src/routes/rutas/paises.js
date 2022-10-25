const { Router } = require('express');
const { Country, Activity } = require('../../db.js');
const axios = require('axios')
const { Op } = require("sequelize");


const router = Router();


 router.get('/', async function (req, res) {
    const {nombre} = req.query
    if (nombre) {
        const querydb = await Country.findAll({where: {name:{[Op.iLike]:`%${nombre}%`}}})
        if (querydb.length === 0) return res.status(404).send("No se encontró nada por ese nombre Query")
        else return res.send(querydb)    
}
const database = await Country.findAll({include: [{model: Activity}]})
if (database.length > 0) {
    return res.send(database)
}
else {
        
        try {
         axios.get("https://restcountries.com/v3/all")
            .then(r => r.data)
            .then(r => {
                console.log(r[2].capital[0])
                const paises = r.map(el => ({
                    ID: el.cca3,
                    name: el.name.common,
                    img: el.flags[1],
                    imgbig: el.flags[0],
                    Continente: el.continents[0],
                    Capital: el.capital ? el.capital[0] : "No tiene",
                    Subregion: el.subregion ? el.subregion : 'Sin Subregion',
                    Area: el.area,
                    Poblacion: el.population
                }))
                Country.bulkCreate(paises)       
                return res.send(paises)
            })
        }
        catch(error){
            res.send(error)
        }
        }                      
}) 

router.get('/:idPais', async function (req, res) {
    const { idPais } = req.params;

    const paisbyID = await Country.findByPk(idPais.toUpperCase(), {include: [{model: Activity}]})

    if (!paisbyID) {
        res.status(404).send("No se encontró ningun país con ese ID")
    }
    else return res.send(paisbyID)
 /*    axios.get('http://localhost:3001/countries')
        .then(r => r.data)
        .then(r => {
            const pais = r.filter(country => country.ID.toLowerCase() == idPais.toLowerCase())
            if (pais.length === 0) {
                return res.status(404).send("No pasaste un ID que coincida con alguna de la base de datos")
            }
            else { return res.json(pais) }
        }) */
})

module.exports = router;
/* r.map(el => Country.create({
    Nombre: el.name.common,
    img: el.flags[1],
    Continente: el.continent[0],
    Capital: el.capital[0],
    Subregion: el.subregion,
    Area: el.area
    Poblacion: el.population
})) */