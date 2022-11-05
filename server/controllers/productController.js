const { Op } = require("sequelize");
const uuid = require('uuid');
const path = require('path');
const {Product, ProductInfo, Type, Category, OrderProduct, BasketProduct} = require('../models/models');
const apiError = require('./../error/apiError');

class ProductController {
    async create(req, res, next) {
        try {
            let {name, price, weight, price_title, categoryId, typeId, info} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const product = await Product.create({
                name,
                price,
                categoryId,
                typeId,
                weight,
                price_title,
                img: fileName
            });

            if(info) {
                info = JSON.parse(info);
                info.forEach(i => {
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                })
            }

            return res.json(product);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }

    }

    async getAll(req, res,next) {
        try {
            let {categoryId, typeId, limit, page} = req.query;
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            let products;
            if (!categoryId && !typeId) {
                products = await Product.findAndCountAll({
                    include: [
                        {model: Category},
                        {model: Type},
                    ],
                    limit,
                    offset})
            }
            if (categoryId && !typeId) {
                products = await Product.findAndCountAll({
                    where:{categoryId},
                    include: [
                        {model: Category},
                        {model: Type},
                    ],
                    limit,
                    offset
                })}
            if (!categoryId && typeId) {
                products = await Product.findAndCountAll({
                    where:{typeId},
                    include: [
                        {model: Category},
                        {model: Type},
                    ],
                    limit,
                    offset
                })}
            if (categoryId && typeId) {
                products = await Product.findAndCountAll({
                    where:{typeId, categoryId},
                    include: [
                        {model: Category},
                        {model: Type},
                    ],
                    limit,
                    offset
                })}
            return res.json(products)
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getSearchAllProductByName(req, res, next) {
        try {
            let {limit, page, name, filter} = req.query;
            console.log("ahsdhkja");
            page = page || 1;
            limit = limit || 7;
            let offset = page * limit - limit
            if(filter === "All") {
                const products =  await Product.findAndCountAll({
                    attributes: ["id", "name", "price", "weight", "img", "price_title"],
                    where:
                        {
                            name: {
                                [Op.like]: `%${name}%`
                            }
                        },
                    include: [
                        {
                            attributes: ["name"],
                            model: Category
                        },
                        {
                            attributes: ["name"],
                            model: Type
                        },
                    ],
                    limit,
                    offset,
                })

                return res.json(products);
            } else {
                const products =  await Product.findAndCountAll({
                    attributes: ["id", "name", "price", "weight", "img", "price_title", "typeId", "categoryId"],
                    where:
                        {
                            name: {
                                [Op.like]: `%${name}%`
                            },
                            [Op.or]: [
                                {
                                    categoryId: null,
                                },
                                {
                                    typeId: null,
                                },
                            ],
                        },
                    include: [
                        {
                            attributes: ["name"],
                            model: Category
                        },
                        {
                            attributes: ["name"],
                            model: Type
                        },
                    ],
                    limit,
                    offset,
                })


                return res.json(products);
            }
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            let products = await Product.findOne({
                where: {id},
                include: [
                    {model: ProductInfo, as: 'info'},
                    {model: Type},
                    {model: Category},
                ]
            });
            return res.json(products);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await Product.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await Product.destroy({where:{id}}).then(() => {
                            return res.json("Product deleted");
                        })
                    } else {
                        return res.json("This Product doesn't exist in DB");
                    }

                    await OrderProduct.destroy({where:{productId: id}})
                    await BasketProduct.destroy({where:{productId: id}})
                })
        } catch (e) {
            return res.json(e);
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const {categoryId, typeId, name, price, info, weight, price_title} = req.body;

            await Product.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        let newVal = {};
                        categoryId ? newVal.categoryId = categoryId : false;
                        typeId ? newVal.typeId = typeId : false;
                        weight ? newVal.weight = weight : false;
                        price_title ? newVal.price_title = price_title : false;
                        name ? newVal.name = name : false;
                        price ? newVal.price = price : false;

                        if(req.files) {
                            const {img} = req.files;
                            const type = img.mimetype.split('/')[1];
                            let fileName = uuid.v4() + `.${type}`;
                            img.mv(path.resolve(__dirname, '..', 'static', fileName));
                            newVal.img = fileName;
                        }

                        if(info) {
                            const parseInfo = JSON.parse(info);
                            for (const item of parseInfo) {
                                await ProductInfo.findOne({where:{id: item.id}}).then( async data => {
                                    if(data) {
                                        await ProductInfo.update({
                                            title: item.title,
                                            description: item.description
                                        }, {where:{id: item.id}})
                                    } else {
                                        await ProductInfo.create({
                                            title: item.title,
                                            description: item.description,
                                            productId: id
                                        })
                                    }
                                })
                            }
                        }

                        await Product.update({
                            ...newVal
                        }, {where:{id}} ).then(() => {
                            return res.json("Product updated");
                        })
                    } else {
                        return res.json("This Product doesn't exist in DB");
                    }
                })
            } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new ProductController();