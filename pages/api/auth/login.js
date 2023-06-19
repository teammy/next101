

import { ksh_conn } from '@/lib/db';
import bcrypt from 'bcrypt';

async function handler(req, res) {
  const { username, password } = req.body;
  // console.log(username)

  // Check if the user exists in the database
  const [rows] = await ksh_conn.raw(`SELECT * FROM personal WHERE person_username = ?`, [username]);
  // const [rows] = await ksh_conn.select('*').from('personal').where({person_username: username});
  const user = rows[0];
  console.log(user)

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // // Verify the password
  // const isPasswordValid = await bcrypt.compare(password, user.password);

  // if (!isPasswordValid) {
  //   return res.status(401).json({ message: 'Invalid username or password' });
  // }

  // Create a session for the user
  req.session.set('user', { id: user.user_id, username: user.person_username });
  await req.session.save();

  res.status(200).json({ message: 'Login successful' });
}

export default withIronSessionApiRoute(handler, {
  password: process.env.SESSION_SECRET,
  cookieName: 'session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
});
