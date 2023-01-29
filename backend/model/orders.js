const bookshelf = require("./dbconfig");
const Order = bookshelf.Model.extend({
    tableName: 'orders',
    products: function () {
        return this.belongsToMany(Product);
    },
    user: function () {
        return this.belongsTo(User);
    },
    payments: function () {
        return this.hasMany(Payment);
    }
});

module.exports = bookshelf.model("Order", Order);