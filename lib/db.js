<<<<<<< HEAD
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

module.exports = { ksh_conn, safety_conn };
=======
import knex from 'knex';

const ksh_conn = knex({
  client: 'mysql2',
  connection: {
    host : process.env.KSH_HOST,
    user : process.env.KSH_USER,
    password : process.env.KSH_PASS,
    database : process.env.KSH_DATABASE
  }
});

const e_leave_conn = knex({
  client: 'mysql2',
  connection: {
    host : process.env.E_LEAVE_HOST,
    user : process.env.E_LEAVE_USER,
    password : process.env.E_LEAVE_PASS,
    database : process.env.E_LEAVE_DATABASE
  }
});


export {ksh_conn,e_leave_conn};

// module.exports = ksh_conn,e_leave_conn;
>>>>>>> 02872fb7b00d96eb9f32c26c63e26ab90fc91baf
