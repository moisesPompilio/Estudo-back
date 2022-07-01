exports.seed = async function (knex) {

    await knex('observacoes').del()
    await knex('observacoes').insert([
      { titulo: 'jpa', descricao: "modelagem das colunas atraves da model", materia_id: 2},
      { titulo: 'Nao sei nada', descricao: "Nao sei nada", materia_id: 3},
      { titulo: 'PHP', descricao: "estudando Crud e API REST FULL", materia_id: 2 },
      { titulo: 'Django', descricao: "estudando Crud e API REST FULL", materia_id: 4},
    ]);
  };