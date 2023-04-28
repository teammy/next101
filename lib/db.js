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