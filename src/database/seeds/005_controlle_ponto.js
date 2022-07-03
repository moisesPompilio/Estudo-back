exports.seed = async function (knex) {

    await knex('controlle_ponto').del()
    await knex('controlle_ponto').insert([
      { entrada_id: 1, saida_id: 2, materia_id: 2, horaEstudo: 36000000},
      { entrada_id: 3, saida_id: 4, materia_id: 3, horaEstudo: 36000000},
      { entrada_id: 5, saida_id: 6, materia_id: 4, horaEstudo: 36000000},
    ]);
  };