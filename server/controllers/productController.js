const uuid = require('uuid')
const path = require('path');
const {Product, ProductInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class ProductController {
    async create(req, res, next) {
        try {
            let {name, price, item_typeId, categoryId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({name, price, item_typeId, categoryId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {item_typeId, categoryId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let product;
        if (!item_typeId && !categoryId) {
            product = await Product.findAndCountAll({limit, offset})
        }
        if (item_typeId && !categoryId) {
            product = await Product.findAndCountAll({where:{item_typeId}, limit, offset})
        }
        if (!item_typeId && categoryId) {
            product = await Product.findAndCountAll({where:{categoryId}, limit, offset})
        }
        if (item_typeId && categoryId) {
            product = await Product.findAndCountAll({where:{categoryId, item_typeId}, limit, offset})
        }
        return res.json(product)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'info'}]
            },
        )
        return res.json(product)
    }
}

module.exports = new ProductController()