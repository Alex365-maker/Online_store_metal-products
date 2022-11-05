const Router = require('express');
const router = new Router();
const productInfoController = require('./../controllers/productInfoController');

router
    .post('/', productInfoController.create)
    .get('/', productInfoController.getAll)

module.exports = router;
