exports.seed = async function (knex) {

    await knex('ponto').del()
    await knex('ponto').insert([
      { data: '2022-07-02 10:44:47', saida: false, materia_id: 2},
      { data: '2022-07-02 20:44:47', saida: true, materia_id: 2},
      { data: '2022-07-02 10:44:47', saida: false, materia_id: 3},
      { data: '2022-07-02 20:44:47', saida: true, materia_id: 3},
      { data: '2022-07-02 10:44:47', saida: false, materia_id: 4},
      { data: '2022-07-02 20:44:47', saida: true, materia_id: 4},
      { data: '2022-07-02 20:44:47', saida: false, materia_id: 3},
      { data: '2022-07-02 20:44:47', saida: false, materia_id: 4},
    ]);
    const date1 = new Date("2022-07-02 10:44:47");
    const date2 = new Date("2022-07-02 20:44:47");

    console.log(date2.getTime() - date1.getTime())
  };