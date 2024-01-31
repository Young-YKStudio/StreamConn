import NextAuth from "next-auth/next";
import { Account, User as AuthUser } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredientialsProvider from 'next-auth/providers/credentials'
import User from '../../../../models/User'
import dbConnect from '../../../../util/DBConnect'
import bcrypt from 'bcryptjs'

export const authOptions = {
  providers: [
    CredientialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'text'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials) {
        await dbConnect()
        try {
          const user = await User.findOne({email: credentials.email})
          if (user) {
            console.log(user, 'at auth route')
          }
        } catch (e) {
          console.log(e, 'error at auth route')
        }
      }
    })
  ],
  // callbacks: {

  // }
}