exports.up = function (knex) {
    return knex.schema.createTable('payments', (table) => {
        table.increments();
        table.integer('order_id').unsigned().notNullable();
        table.foreign('order_id').references('orders.id');
        table.string('payment_method').notNullable();
        table.string('transaction_id').notNullable();
        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('payments');
};