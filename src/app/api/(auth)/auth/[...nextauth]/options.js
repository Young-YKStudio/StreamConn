import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '../../../../models/User'
import dbConnect from '@/app/util/DBConnect'
import bcrypt from 'bcryptjs'

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        let userRole = 'Google User'
        return {
          ...profile,
          id: profile.sub,
          picture: profile.picture,
          role: userRole
        }
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SEC
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
    async jwt({ token, user, account }) {
      if(user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token, user }) {
      // console.log(user, 'session on options')
      // let newSession = session
      
      await dbConnect()
      
      if(session?.user) {

        
        const foundUser = await User.findOne({email: session.user.email})
        
        session.user.role = token.role
        session.user.picture = foundUser.profile
        session.user.isUpdated = foundUser.isUpdated
        session.user.id = foundUser._id
      }
      return session
    }, 
    async signIn({ account, profile }) {
      if(account.provider === 'google') {
        await dbConnect()

        const foundUser = await User.findOne({email: profile.email})

        if(!foundUser) {

          let newDBUser = await User.create({
            email: profile.email,
            profile: profile.picture,
            locale: profile.locale
          })

          return true
          
        } else {
          return true
        }
      }
    }
  },
  pages: {
    signIn: '/login'
  }
}