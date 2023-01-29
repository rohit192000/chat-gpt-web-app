exports.up = function (knex) {
    return knex.schema.createTable('products', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.decimal('price').notNullable();
        table.integer('quantity').notNullable();
        table.string('image_url').notNullable();
        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('products');
};