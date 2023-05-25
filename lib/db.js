import knex from "knex";

const ksh_conn = knex({
  client: "mysql2",
  connection: {
    host: process.env.KSH_HOST,
    user: process.env.KSH_USER,
    password: process.env.KSH_PASS,
    database: process.env.KSH_DATABASE,
    port: 3306,
  },
});

const safety_conn = knex({
  client: "mysql2",
  connection: {
    host: process.env.SAFETY_HOST,
    user: process.env.SAFETY_USER,
    password: process.env.SAFETY_PASS,
    database: process.env.SAFETY_DATABASE,
    port:3306,
  },
});

const closeSafetyConnection = () => {
  safety_conn.destroy()
    .then(() => {
      console.log('Safety connection closed');
    })
    .catch(error => {
      console.error('Error closing Safety connection:', error);
    });
};


module.exports = { ksh_conn, safety_conn,closeSafetyConnection };
