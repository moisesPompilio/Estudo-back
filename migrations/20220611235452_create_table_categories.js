 
exports.up = function(knex) {
  return knex.schema.createTable("categories", (table) =>{
    table.increments("id").primary();
    table.string("name").notNull();
    table.string("image").notNull();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("categories");
};
