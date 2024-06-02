
exports.seed = (knex, Promise) => {
    return knex('todos').del()
      .then(() => {
        return knex('todos').insert([
          {title: 'Do something', completed: false},
          {title: 'Do something else', completed: false}
        ]);
      });
  };