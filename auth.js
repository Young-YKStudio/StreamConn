import NextAuth from 'next-auth'
// import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/app/util/mongodb'
import authConfig from './auth.config'
import CredentialsProvider from 'next-auth/providers/credentials'

// export default NextAuth({
//   adapter: MongoDBAdapter(clientPromise),
//   session: { strategy: 'jwt' },

// })

export const { auth, signIn, handlers:{GET, POST}} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
        console.log(credentials)
        // const user = {id: 0, email: 'test@test.com', password: '123123'}
        // if (
        //   credential?.email == user.email &&
        //   credential?.password == user.password
        // ) {
        //   return user
        // } else return null
      }
    })
  ], 
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  }
})