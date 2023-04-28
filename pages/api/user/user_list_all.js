import { ListUser } from "controllers/user/users";

export default async function handler(req,res) {
  if (req.method === 'GET') {
    ListUser()
  } else {
    res.status(400).send("Errro!")
  }
}