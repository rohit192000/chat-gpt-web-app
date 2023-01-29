exports.up = function (knex) {
    return knex.schema.createTable('orders', (table) => {
        table.increments();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id');
        table.integer('product_id').unsigned().notNullable();
        table.foreign('product_id').references('products.id');
        table.integer('quantity').notNullable();
        table.decimal('total_price').notNullable();
        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('orders');
};