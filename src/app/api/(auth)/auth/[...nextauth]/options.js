import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '../../../../models/User'
import dbConnect from '@/app/util/DBConnect'
import bcrypt from 'bcryptjs'

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        console.log('Profile Google:', profile)

        let userRole = 'Google User'
        return {
          ...profile,
          id: profile.sub,
          role: userRole
        }
      },
      // clientId: process.env.GOOGLEID,
      // clientSecret: process.env.GOOGLESEC
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email:',
          type: 'text',
          placeholder: 'your email'
        },
        passowrd: {
          label: 'password:',
          type: 'password',
          placeholder: 'your password'
        }
      },
      async authorize(credentials) {
        await dbConnect()
        console.log('db connected')
        try {
          const allUsers = await User.find().lean().exec()
          const foundUser = allUsers.find((user) =>  user.email = credentials.email)

          if(foundUser) {
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
              )
            if(match) {
              return foundUser
            }
            console.log(match, 'uer found')
          }
        } catch (error) {
          console.log(error, 'error at auth options')
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if(user) token.role = user.role
      return token
    },
    async session({ session, token }) {
      if(session?.user) session.user.role = token.role
      return session
    }
  }
}