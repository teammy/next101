import { safety_conn } from "../../../lib/db";  

export default async function handler(req, res) {

  if(req.method === 'POST') {
    const {equip_type,equip_depart,equip_location,equip_date_start,equip_date_expire} = req.body;

    try {
      const result = await safety_conn('equip_item').insert({
        equip_type:equip_type,
        equip_department:equip_depart,
        equip_location_install:equip_location,
        equip_date_start:equip_date_start,
        equip_date_expire:equip_date_expire,
      });
      res.status(200).json({message: "เพิ่มข้อมูลเรียบร้อยแล้ว"}); 
    } catch (error) {
      res.status(500).json({message: error.message});
      console.log(error);
    }
  } 

  if(req.method==='GET') {
    try {
      const result = await safety_conn('equip_item').select('equip_department','equip_location_install','equip_type').orderBy('equip_id','desc');
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message: error.message});
      console.log(error);
    }
  }

}