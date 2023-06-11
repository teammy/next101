import { safety_conn } from "../../../lib/db";  

export default async function handler(req, res) {

  if(req.method==='GET') {
    try {
      const { id } = req.query;
      const result = await safety_conn('equip_item').select(
        'ei.equip_id',
        'et.equip_type_name',
        'eb.equip_building_name',
        'ef.equip_floor_value',
        'ed.equip_department_name',
        'ei.equip_location_install',
        'ei.equip_date_start',
        'ei.equip_date_expire'
      )
      .from('equip_item AS ei')
      .innerJoin('equip_type AS et', 'et.equip_type_id', 'ei.equip_type')
      .innerJoin('equip_building AS eb', 'eb.equip_building_id', 'ei.equip_building')
      .innerJoin('equip_floor AS ef', 'ef.equip_floor_id', 'ei.equip_floor')
      .innerJoin('equip_department AS ed', 'ed.equip_department_id', 'ei.equip_department')
      .where('ei.equip_id',id)
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message: error.message});
      console.log(error);
    } 
  }

}