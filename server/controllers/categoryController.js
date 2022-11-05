const {Category} = require('./../models/models');

class BranController {
    async create(req, res) {
        const {name} = req.body;

        const category = await Category.create({name});
        return res.json(category);
    }

    async getAll(req, res) {
        const types = await Category.findAll();
        return res.json(types);
    }

    async delete(req, res) {
        try {
            const {id} = req.params;

            await Category.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await Category.destroy({where:{id}}).then(() => {
                            return res.json("Category deleted");
                        })
                    } else {
                        return res.json("This Category doesn't exist in DB");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new BranController();
