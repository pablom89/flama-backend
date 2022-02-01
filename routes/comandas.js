const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createComanda, getLastComanda } = require('../controllers/comanda');


router.post(
    '/',
    [
        check('pizza', 'Tu pizza debe contener toppings y nombre'),
        validarCampos
    ], 
    createComanda )

router.get('/', getLastComanda )

module.exports = router;