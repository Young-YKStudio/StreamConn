import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/app/util/mongodb'
import authConfig from './auth.config'

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt' },

})