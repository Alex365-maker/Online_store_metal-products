const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
});

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    productId: {type: DataTypes.INTEGER},
});

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.DOUBLE, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    weight: {type: DataTypes.DOUBLE, defaultValue: 0},
    price_title: {type:DataTypes.STRING, defaultValue: "цена за метр погонный"},
    img: {type: DataTypes.STRING, allowNull: false},
});

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
});

const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
});

const TypeCategory = sequelize.define('type_category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Orders = sequelize.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    complete: {type: DataTypes.BOOLEAN, defaultValue: false},
    mobile: {type: DataTypes.STRING(25), allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: true},
})

const OrderProduct = sequelize.define('order_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    productId: {type: DataTypes.INTEGER, allowNull: false},
    orderId: {type: DataTypes.INTEGER, allowNull: false},
    count: {type: DataTypes.INTEGER, allowNull: false},
})

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

User.hasMany(Orders);
Orders.belongsTo(User,
    {
        foreignKey: { name: 'userId' },
        onDelete: 'CASCADE',
    }
);

Orders.hasMany(OrderProduct);
OrderProduct.belongsTo(Orders,
    {
        foreignKey: { name: 'orderId' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

Type.hasMany(Product);
Product.belongsTo(Type);

Type.hasMany(Product);
Product.belongsTo(Type);

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Rating);
Rating.belongsTo(Product);

Product.hasMany(ProductInfo, {as: 'info'});
ProductInfo.belongsTo(Product);

Type.belongsToMany(Category, {through: TypeCategory});
Category.belongsToMany(Type, {through: TypeCategory});


module.exports = {
    User,
    Basket,
    BasketProduct,
    Product,
    Type,
    Category,
    Rating,
    TypeCategory,
    ProductInfo,
    Orders,
    OrderProduct
}
