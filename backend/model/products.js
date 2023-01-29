const bookshelf = require("./dbconfig");

const Product = bookshelf.Model.extend({
    tableName: 'products',
    orders: function () {
        return this.belongsToMany(Order);
    }
});
module.exports = bookshelf.model("Product", Product);
