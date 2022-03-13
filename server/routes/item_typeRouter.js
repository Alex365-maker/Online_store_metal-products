const Router = require('express')
const router = new Router()
const item_typeController = require('../controllers/item_typeController')

router.post('/', item_typeController.create)
router.get('/', item_typeController.getAll)

module.exports = router