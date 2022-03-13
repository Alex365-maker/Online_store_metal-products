const {Item_type} = require('../models/models')
const ApiError = require('../error/ApiError');

class Item_typeController {
    async create(req, res) {
        const {name} = req.body
        const item_type = await Item_type.create({name})
        return res.json(item_type)
    }

    async getAll(req, res) {
        const items_type = await Item_type.findAll()
        return res.json(items_type)
    }

}

module.exports = new Item_typeController()