import { ksh_conn } from "lib/db";

const CreateUser = async (req,res) => {
  try {
    const newUser = await ksh_conn.raw(`SELECT * FROM personal WHERE person_username = ?`, [username]);
    res.status(200).json(result);
    res.status(200).send('Create User!!');
  } catch (err) {
    console.log(err)
    res.status(400).send('Create User Error');
  }
}

const ListUser = async (req,res) => {
  try {
    const listAllUser = await ksh_conn.select('*').from('personal');
    res.status(200).json(listAllUser);
  } catch (err) {
    console.log(err)
    res.status(400).send('Cannot List User!!');
  }
}


const EditUser = async (req,res) => {
  try {
    const listAllUser = await ksh_conn.select('*').from('personal');
    res.status(200).json(listAllUser);
  } catch (err) {
    console.log(err)
    res.status(400).send('Cannot List User!!');
  }
}

export default ListUser;