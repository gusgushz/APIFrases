/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('phrase_labels', function (table) {
    table.integer('phrase_id').unsigned();
    table.integer('label_id').unsigned();

    // Define foreign keys
    table.foreign('phrase_id').references('phrases.id').onDelete('CASCADE');
    table.foreign('label_id').references('labels.id').onDelete('CASCADE');

    // Define a composite primary key using both 'phrase_id' and 'label_id'
    table.primary(['phrase_id', 'label_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('phrase_labels');
};
