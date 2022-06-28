module.exports = {
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      port : 3308,
      user : 'admin',
      password : 'admin',
      database : 'admin'
    },
    pool:{
        min: 2,
        max: 10
    },
    migrations:{
        tableName: "knex_migrations",
        directory: `${__dirname}/src/database/migrations`
    },
    seeds:{
        directory: `${__dirname}/src/database/seeds`
    }
}