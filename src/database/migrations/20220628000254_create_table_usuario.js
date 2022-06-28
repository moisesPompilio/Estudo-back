
exports.up = function(knex) {
  return  knex.schema.createTable('usuario',function(table){
    table.increments('id').primary();
    table.string('name').unique().notNullable();
    table.string('email').unique().notNullable();
    table.string('senha').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};


exports.down = (knex) =>{
    knex.schema.dropTable("usuario")
};
