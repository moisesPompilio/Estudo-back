exports.up = function (knex) {
    return knex.schema.createTable('observacoes', function (table) {
        table.increments('id').primary();
        table.text('titulo').notNullable();
        table.text('descricao').notNullable();
        table.integer('materia_id')
            .references("materia.id")
            .notNullable()
            .onDelete("CASCADE");
        table.timestamps(true, true);
    })
};


exports.down = (knex) => {
    knex.schema.dropTable("observacoes")
};