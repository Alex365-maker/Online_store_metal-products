const Router = require('express');
const router = new Router();
const productRouter = require('./productRouter');
const categoryRouter = require('./categoryRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');
const basketRouter = require('./basketRouter');
const ratingRouter = require('./ratingRouter');
const ordersRouter = require('./ordersRouter');
const productInfoRouter = require('./productInfoRouter');

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/basket', basketRouter)
router.use('/rating', ratingRouter)
router.use('/orders', ordersRouter)
router.use('/productInfo', productInfoRouter)

module.exports = router;
