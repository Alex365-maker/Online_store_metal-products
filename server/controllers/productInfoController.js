const {ProductInfo} = require('./../models/models');

class ProductInfoController {
    async create(req, res) {
        const {title, description, ProductId} = req.body;
        const ProductInfo = await ProductInfo.create({title, description, productId})
        return res.json(ProductInfo)
    }

    async getAll(req, res) {
        const ProductInfo = await ProductInfo.findAll()
        return res.json(ProductInfo);
    }

}

module.exports = new ProductInfoController();