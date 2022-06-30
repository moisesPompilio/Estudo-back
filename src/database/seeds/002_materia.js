
exports.seed = async function (knex) {

  await knex('materia').del()
  await knex('materia').insert([
    { titulo: 'javaScript', descricao: "estudando Crud e API REST FULL", usuario_id: 2, horasEstudo: 0},
    { titulo: 'Spring', descricao: "estudando Crud e API REST FULL", usuario_id: 3, horasEstudo: 0 },
    { titulo: 'PHP', descricao: "estudando Crud e API REST FULL", usuario_id: 2, horasEstudo: 0 },
    { titulo: 'Django', descricao: "estudando Crud e API REST FULL", usuario_id: 4, horasEstudo: 0 },
  ]);
};
