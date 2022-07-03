exports.up = function (knex) {
    return knex.schema.createTable('controlle_ponto', function (table) {
        table.increments('id').primary();
        table.integer('saida_id')
            .references("ponto.id")
            .notNullable()
            .onDelete("CASCADE");
        table.integer('entrada_id')
            .references("ponto.id")
            .notNullable()
            .onDelete("CASCADE");
        table.float("horaEstudo").notNullable();
        table.integer('materia_id')
            .references("materia.id")
            .notNullable()
            .onDelete("CASCADE");
        table.timestamps(true, true);
    })
};


exports.down = (knex) => {
    knex.schema.dropTable("controlle_ponto")
};
