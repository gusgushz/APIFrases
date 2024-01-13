/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('phrases', function (table) {
    table.increments('id');
    table.integer('author_id').unsigned(); // Foreign key referencing authors table
    table.string('content');

    // Define a composite primary key using both 'id' and 'author_id'
    table.primary(['id', 'author_id']);

    // Define a foreign key constraint
    table.foreign('author_id').references('authors.id').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('phrases');
};
