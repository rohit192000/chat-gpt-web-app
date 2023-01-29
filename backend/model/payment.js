const bookshelf = require("./dbconfig");

const Payment = bookshelf.Model.extend({
    tableName: 'payments',
    hasTimestamps : true,
    order: function () {
        return this.belongsTo(Order);
    }
});

module.exports = bookshelf.model("Payment", Payment);