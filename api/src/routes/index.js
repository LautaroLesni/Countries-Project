const { Router } = require('express');
const paisesMiddleware = require('./rutas/paises')
const actividadesMiddleware = require('./rutas/actividades')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', paisesMiddleware)
router.use('/activities', actividadesMiddleware)

router.get('/',function(req,res){
    res.send("Prueba PI")
})

module.exports = router;
