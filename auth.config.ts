import Naver from 'next-auth/providers/naver'
import Google from 'next-auth/providers/google'
import Twitch from 'next-auth/providers/twitch'

import type { NextAuthConfig } from 'next-auth'

export default {
  providers: [Naver, Google, Twitch],
} satisfies NextAuthConfig