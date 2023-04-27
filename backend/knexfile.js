// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: "postgres",
    connection: "postgres://postgres:password@localhost:5432/tasks",
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: "postgres",
    connection: {
      host: "localhost",
      port: 5432,
      database: "tasks",
      user: "postgres",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',  
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
