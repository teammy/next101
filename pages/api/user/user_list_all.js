import { ListUser } from "controllers/user/users";
// import ListUser from "controllers/user/users";
import { ksh_conn } from "lib/db";

export default async function handler(req,res) {
  try {
    ListUser();
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
}