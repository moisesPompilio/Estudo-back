exports.up = function (knex) {
    return knex.schema.createTable('ponto', function (table) {
        table.increments('id').primary();
        table.dateTime("data").notNullable();
        table.boolean("saida").notNullable();
        table.integer('materia_id')
            .references("materia.id")
            .notNullable()
            .onDelete("CASCADE");
        table.timestamps(true, true);
    })
};


exports.down = (knex) => {
    knex.schema.dropTable("ponto")
};
