import { safety_conn } from "../../../lib/db";  

export default async function handler(req, res) {

  if(req.method==='GET') {
    try {
      const result = await safety_conn('equip_type').select('*');
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message: error.message});
      console.log(error);
    }
  }


}