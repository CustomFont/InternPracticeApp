/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasklist').del()
  await knex('tasklist').insert([
    {id: 1, task: 'turn in documents', starttime: '2023-04-25T22:53', endtime: '2023-04-25T22:54'},
    {id: 2, task: 'draw a cow', starttime: '2023-04-25T22:53', endtime: '2023-04-25T22:54'},
    {id: 3, task: 'finish the above things on time', starttime: '2023-04-25T22:53', endtime: '2023-04-25T22:54'},
  ]);
};
