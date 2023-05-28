import { safety_conn,closeSafetyConnection } from "../../../lib/db";  

export default async function handler(req, res) {

  if(req.method==='GET') {
    try {
      const result = await safety_conn('equip_building').select('*').orderBy('equip_building_id','desc');
      res.status(200).json(result);
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