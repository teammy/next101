import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import callbacks from "../../../lib/callback-login";
import { ksh_conn } from '@/lib/db';

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const {username , password } = credentials
        const [rows] = await ksh_conn.raw(`SELECT * FROM personal WHERE person_username = ?`, [username]);
        const user = rows[0];
  
        if (!user) {
          // Any object returned will be saved in `user` property of the JWT
          throw new Error('Invalid User!!')
        } 
        const isPassword = await bcrypt.compare(password, user.person_password)
      }
    }),
  ],
  callbacks,
};

export default NextAuth(options);