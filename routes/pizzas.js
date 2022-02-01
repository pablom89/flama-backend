const { Router } = require('express');
const { validarJWT } = require('../middlewares/validarJwt')
const { check } = require('express-validator');
const router = Router();
const { getPizzas, makePizza, editPizza, deletePizza } = require('../controllers/pizzas')
const { validarCampos } = require('../middlewares/validar-campos');



// obtener pizzas
router.get('/', getPizzas);

router.use(validarJWT);


// crear pizza
router.post(
    '/',
    [
        check('nombre', 'La pizza debe tener un nombre').not().isEmpty(),
        check('precio', 'La pizza debe tener un precio').not().isEmpty(),
        check('content', 'La pizza debe tener toppings').not().isEmpty(),
        validarCampos

    ],
    makePizza);

// Editar pizza

router.put('/:id', editPizza);

// Borrar pizza

router.delete('/:id', deletePizza);

module.exports = router;