import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
<<<<<<< HEAD
import {ksh_conn} from "../../../lib/db";
import bcrypt from "bcrypt";
=======
import callbacks from "../../../lib/callback-login";
import { ksh_conn } from '@/lib/db';
>>>>>>> 02872fb7b00d96eb9f32c26c63e26ab90fc91baf

const options = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
<<<<<<< HEAD
        const { username, password } = credentials;
        const user = await ksh_conn.select('*').from('personal').where('person_username', username).first();

        if (!user) {
          throw new Error("ไม่พบชื่อผู้ใช้งานนี้")
        } 
        
        // Check Password
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if(!isValidPassword) {
          throw new Error("รหัสผ่านไม่ถูกต้อง!");
        }

        return user;
=======
        const {username , password } = credentials
        const [rows] = await ksh_conn.raw(`SELECT * FROM personal WHERE person_username = ?`, [username]);
        const user = rows[0];
  
        if (!user) {
          // Any object returned will be saved in `user` property of the JWT
          throw new Error('Invalid User!!')
        } 
        const isPassword = await bcrypt.compare(password, user.person_password)
>>>>>>> 02872fb7b00d96eb9f32c26c63e26ab90fc91baf
      }
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.user_id = user.user_id;
        token.username = user.person_username;
      }
      return token;
    },
    async session({session, token}) {
      if (token && session.user) {
        session.user.user_id = token.user_id;
        session.user.username = token.username;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(options);