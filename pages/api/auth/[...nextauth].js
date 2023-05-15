import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {ksh_conn} from "../../../lib/db";
import bcrypt from "bcrypt";

const options = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
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