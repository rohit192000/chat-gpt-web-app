const bookshelf = require("./dbconfig");

const Payment = bookshelf.Model.extend({
    tableName: 'payments',
    order: function () {
        return this.belongsTo(Order);
    }
});

module.exports = bookshelf.model("Payment", Payment);