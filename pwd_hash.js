const bcrypt = require("bcrypt");


async function hashPasswords() {
  
  try {
    const mysql = require('mysql2/promise');

const ksh_conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_ksh_new",
});
    const [rows, fields]  = await ksh_conn.execute('SELECT user_id,person_password FROM personal');

  //   // Handle the rows data
    for (const row of rows) {
      console.log(row.user_id, row.person_password);
    //   // const hashedPassword = await bcrypt.hash(row.person_password, 10);
  
    //   // const updateQuery = "UPDATE personal SET password_hash = ? WHERE user_id = ?";
    //   // const updateValues = [hashedPassword, row.user_id];
  
    //   // await ksh_conn.execute(updateQuery, updateValues);
    }
  
    console.log("Passwords hashed successfully!");

  } catch (error) {
    // Handle the error
    console.error(error);
  }

 
}

async function main() {
  // get the client
  const mysql = require('mysql2/promise');
  // create the connection
  const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'db_ksh_new'});
  // query database
  const [rows] = await connection.execute('SELECT user_id,person_password FROM personal');

  try {
    for (const row of rows) {
      console.log(row.user_id, row.person_password);
      const hashedPassword = await bcrypt.hash(row.person_password, 10);
  
      const updateQuery = "UPDATE personal SET password_hash = ? WHERE user_id = ?";
      const updateValues = [hashedPassword, row.user_id];
  
      await connection.execute(updateQuery, updateValues);
    }
  } catch (error) {
     // Handle the error
     console.error(error);
  }

}

main();