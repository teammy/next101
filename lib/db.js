const mysql = require('mysql2/promise');

const ksh_conn = mysql.createConnection({
  host: process.env.KSH_HOST,
  user: process.env.KSH_USER,
  password: process.env.KSH_PASS,
  database: process.env.KSH_DATABASE
});

const e_leave_conn = mysql.createConnection({
  host: process.env.E_LEAVE_HOST,
  user: process.env.E_LEAVE_USER,
  password: process.env.E_LEAVE_PASS,
  database: process.env.E_LEAVE_DATABASE
});

module.exports = ksh_conn,e_leave_conn;