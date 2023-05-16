import { ksh_conn } from "lib/db";

export default async function handler(req, res) {

  try {
    // const result = await ksh_conn.raw(`SELECT * FROM personal LIMIT 2`);
    // console.log(result)
    // res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
}
