import NextAuth from 'next-auth'
import Naver from '@auth/core/providers/naver'
import Google from '@auth/core/providers/google'
import Twitch from '@auth/core/providers/twitch'
import Email from '@auth/core/providers/email'

export const {
  handlers: {GET, POST},
  auth
} = NextAuth({
  providers: [Naver, Google, Twitch, Email],
})