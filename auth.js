import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/app/util/mongodb'
import Naver from '@auth/core/providers/naver'
import Google from '@auth/core/providers/google'
import Twitch from '@auth/core/providers/twitch'

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
})