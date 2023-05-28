import { safety_conn } from "../../../lib/db";

export default async function handler(req, res) {

  if (req.method === "POST") {
    const itemId  = req.body;
    try {
      const result = await safety_conn('equip_item').where('equip_id', itemId).del();
      res.status(200).json({ message: "ข้อมูลได้ถูกลบออกจากระบบแล้ว." });
      if (result) {
      } else {
        res.status(404).json({ message: "Not Found." });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
