import { safety_conn } from "../../../lib/db";  

export default async function handler(req, res) {

  if(req.method === 'POST') {
    const {equip_building_name} = req.body;

    try {
      const result = await safety_conn('equip_building').insert({
        equip_building_name:equip_building_name,
      });
      res.status(200).json({message: "เพิ่มข้อมูลเรียบร้อยแล้ว"}); 
    } catch (error) {
      res.status(500).json({message: error.message});
      console.log(error);
    }
  } 

  if(req.method==='GET') {
    try {
      const result = await safety_conn('equip_building').select('*').orderBy('equip_building_id','desc');
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message: error.message});
      console.log(error);
    }
  }


}