import {query_ksh} from "../../../lib/db_pool";

export default async function handler(req, res) {

  try {
    const result = await query_ksh(
      `
      SELECT * FROM personal where user_id=1
      `
    );
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
}
