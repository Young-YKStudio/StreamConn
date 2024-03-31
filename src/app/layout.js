import './globals.css'
import HeaderLanding from './components/headers/header/HeaderLanding'

import { getServerSession } from 'next-auth'
import SessionProvider from './util/SessionProvider'
import Providers from '@/redux/reduxProviders'

export const metadata = {
  title: 'Stream Connect',
  description: 'Where all streamers and viewers meet',
}

export default async function RootLayout({ children }) {

  const session = await getServerSession()

  return (
    <html lang="en">
      <body className='text-white bg-black'>
        <Providers>
          <SessionProvider session={session}>
            <HeaderLanding />
            <div className='w-screen h-screen'>
              {children}
            </div>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  )
}
