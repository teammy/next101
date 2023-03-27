import mysql from 'mysql2/promise';

const ksh_conn = mysql.createPool({
  host: process.env.KSH_HOST,
  user: process.env.KSH_USER,
  password: process.env.KSH_PASS,
  database: process.env.KSH_DATABASE,
});

const e_leave_conn = mysql.createPool({
  host: process.env.E_LEAVE_HOST,
  user: process.env.E_LEAVE_USER,
  password: process.env.E_LEAVE_PASS,
  database: process.env.E_LEAVE_DATABASE,
});

export async function query_ksh(sql, params) {
  const [rows] = await ksh_conn.query(sql, params);
  return rows;
}

export async function query_eleave(sql, params) {
  const [rows] = await e_leave_conn.query(sql, params);
  return rows;
}