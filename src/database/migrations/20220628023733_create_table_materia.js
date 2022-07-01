
exports.up = function (knex) {
    return knex.schema.createTable('materia', function (table) {
        table.increments('id').primary();
        table.text('titulo').notNullable();
        table.text('descricao').notNullable();
        table.float('horasEstudo').notNullable();
        table.integer('usuario_id')
            .references("usuario.id")
            .notNullable()
            .onDelete("CASCADE");
        table.timestamps(true, true);
    })
};


exports.down = (knex) => {
    knex.schema.dropTable("materia")
};
