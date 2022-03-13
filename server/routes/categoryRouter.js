const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoriesController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', categoryController.create)
router.get('/', categoryController.getAll)

module.exports = router