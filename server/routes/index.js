const Router = require('express')
const router = new Router()
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const item_typeRouter = require('./item_typeRouter')
const categoryRouter = require('./categoryRouter')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/item_type', item_typeRouter)
router.use('/product', productRouter)

module.exports = router