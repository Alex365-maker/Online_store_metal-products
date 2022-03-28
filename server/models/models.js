const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: {type: DataTypes.INTEGER, defaultValue: 0},
    total_price: {type: DataTypes.INTEGER, defaultValue: 0},
    weight: {type: DataTypes.INTEGER, defaultValue: 0},
})

const Order = sequelize.define('order',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userID: {type: DataTypes.INTEGER},
    total_price: {type: DataTypes.INTEGER},
    dataSale: {type: DataTypes.INTEGER},
    product_id: {type: DataTypes.INTEGER},
    amount: {type: DataTypes.INTEGER},
    weight: {type: DataTypes.INTEGER},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    isCount: {type: DataTypes.INTEGER, allowNull: false}
})

const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    price_tonne: {type: DataTypes.INTEGER},
    weight: {type: DataTypes.INTEGER},
    dimensions: {type: DataTypes.STRING},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    parentID: {type: DataTypes.INTEGER},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})


// const Basket = sequelize.define('basket', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// })
//
// const BasketProduct = sequelize.define('basket_product', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// })
//
// const Product = sequelize.define('product', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false},
//     price: {type: DataTypes.INTEGER, allowNull: false},
//     rating: {type: DataTypes.INTEGER, defaultValue: 0},
//     img: {type: DataTypes.STRING, allowNull: false},
// })
//
// const Category = sequelize.define('category', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false},
// })
//
// const Item_type = sequelize.define('item_type', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false},
// })
//
// const Rating = sequelize.define('rating', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     rate: {type: DataTypes.INTEGER, allowNull: false},
// })
//
// const ProductInfo = sequelize.define('product_info', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     title: {type: DataTypes.STRING, allowNull: false},
//     description: {type: DataTypes.STRING, allowNull: false},
//     weight: {type: DataTypes.INTEGER, allowNull: true},
//     price_tonne: {type: DataTypes.INTEGER, allowNull: true},
// })
//
// const Type_item_type = sequelize.define('type_item_type', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// })


User.hasOne(Basket)
Basket.belongsTo(User)

// User.hasMany(Rating)
// Rating.belongsTo(User)

Basket.hasMany(Product)
Product.belongsTo(Basket)

Category.hasMany(Product)
Product.belongsTo(Category)

// Item_type.hasMany(Product)
// Product.belongsTo(Item_type)

// Product.hasMany(Rating)
// Rating.belongsTo(Product)

Order.hasOne(Basket)
Basket.belongsTo(Order)


Product.hasMany(ProductInfo, {as: 'info'});
ProductInfo.belongsTo(Product)

// Category.belongsToMany(Item_type, {through: Type_item_type })
// Item_type.belongsToMany(Category, {through: Type_item_type })

module.exports = {
    User,
    Basket,
    // BasketProduct,
    Product,
    Category,
    Order,
    // Item_type,
    // Rating,
    // Type_item_type,
    ProductInfo
}