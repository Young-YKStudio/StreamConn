import NextAuth from "next-auth/next";
import { Account, User as AuthUser } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredientialsProvider from 'next-auth/providers/credentials'
import User from '../../../../models/User'
import dbConnect from '../../../../util/DBConnect'
import bcrypt from 'bcryptjs'
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/util/mongodb";

//TODO: import Google, Twitch, Chzzk, YouTube ??? or only to get information

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredientialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'text'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials, req) {
        await dbConnect()
        try {
          const user = await User.findOne({email: credentials?.email})
          if(user) {
            console.log('found user from mongoDB')
          }

        } catch (e) {
          console.log(e, 'error at trying on mongo at auth.js')
        }
        // console.log(user, 'at auth route')
        // try {
        //   if(user) {
        //   }
        // } catch (e) {
        //   console.log(e, 'error at auth route')
        // }
      }
    })
  ],
  callbacks: {
    async signIn({ user: AuthUser, account: Account}) {
      if (account?.provider == 'credentials') {
        return true
      }
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }