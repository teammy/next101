import { safety_conn,closeSafetyConnection } from "../../../lib/db";  

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
}

process.on('SIGINT', () => {
  closeSafetyConnection();
  process.exit(0);
});