import bcrypt from "bcrypt";
import ksh_conn from "./db";

const callbacks = {
  async signIn(user, account, profile) {
    const query = "SELECT * FROM personal WHERE person_username = ?";
    const values = [user.email];

    const [rows] = await ksh_conn.execute(query, values);

    if (rows.length === 0) {
      throw new Error("Not Found User!");
    }

    const dbUser = rows[0];

    const isValidPassword = await bcrypt.compare(user.password, dbUser.password);

    if (!isValidPassword) {
      throw new Error("Password is Wrong!");
    }

    return true;
  },

  async session(session, user) {
    const query = "SELECT * FROM users WHERE email = ?";
    const values = [user.email];

    const [rows] = await ksh_conn.execute(query, values);

    const dbUser = rows[0];

    session.user = {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
    };

    return session;
  },
};

export default callbacks;
