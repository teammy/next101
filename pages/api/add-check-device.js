import { safety_conn } from "../../lib/db";
import { useRouter } from "next/router";


export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      question1,
      question2,
      question3,
      reviewer,
      device_id,
    } = req.body;

    try {
      const result = await safety_conn("equip_check").insert({
        equip_check_point1: question1,
        equip_check_point2: question2,
        equip_check_point3: question3,
        equip_check_name: reviewer,
        equip_check_device_id: device_id,
      });
      res.status(200).json({ message: "เพิ่มข้อมูลเรียบร้อยแล้ว" });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  }
}
