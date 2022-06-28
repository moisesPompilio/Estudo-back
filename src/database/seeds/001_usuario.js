/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('usuario').del()
  await knex('usuario').insert([
    { name: 'maicom', email: 'maicom@email.com', senha: "1234"},
    { name: 'will',email: 'will@email.com', senha: "1234"},
    { name: 'bill',email: 'bill@email.com', senha: "1234"}
  ]);
};
