/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('authors', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.string('last_name');
    table.string('url_image');
    table.string('country');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('authors');
};
