import { safety_conn } from "../../../lib/db";  

export default async function handler(req, res) {

  if(req.method === 'POST') {
    const {equip_department_name} = req.body;

    try {
      const result = await safety_conn('equip_department').insert({
        equip_department_name:equip_department_name,
      });
      res.status(200).json({message: "เพิ่มข้อมูลเรียบร้อยแล้ว"}); 
    } catch (error) {
      res.status(500).json({message: error.message});
      console.log(error);
    }
  } 



}