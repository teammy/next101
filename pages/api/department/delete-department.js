import { safety_conn } from "../../../lib/db";  

export default async function handler(req, res) {

  if(req.method === 'POST') {
    const { itemId } = req.body;

    try {
      const result = await safety_conn('equip_department').where('equip_department_id',itemId).del();
      res.status(200).json({message: "ลบเรียบร้อยแล้ว"}); 
    } catch (error) {
      res.status(500).json({message: error.message});
      console.log(error);
    }
  } 

}