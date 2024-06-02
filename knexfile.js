const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.password;
const DATABASE_URL = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/todos`


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: `${__dirname}/src/knex/migrations`,
      tableName: 'migrations'
    },
    seeds: {
      directory: `${__dirname}/src/knex/seeds`,
    },
  },

  production: {
    client: 'postgresql',
    connection: DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: `${__dirname}/src/knex/migrations`,
      tableName: 'migrations'
    },
    seeds: {
      directory: `${__dirname}/src/knex/seeds`,
    },
  }

};
