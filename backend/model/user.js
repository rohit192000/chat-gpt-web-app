const bookshelf = require("./dbconfig");
const User = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps : true,
    orders: function() {
      return this.hasMany(Order);
    }
  });

module.exports = bookshelf.model("User", User);