import './globals.css'
import HeaderLanding from './components/headers/header/HeaderLanding'
import SideBar from './components/sidebar/sideBar'

import { getServerSession } from 'next-auth'
import SessionProvider from './util/SessionProvider'

export const metadata = {
  title: 'Stream Connect',
  description: 'asdf',
}

export default async function RootLayout({ children }) {

  const session = await getServerSession()

  return (
    <html lang="en">
      <body className='text-white bg-black'>
        <SessionProvider session={session}>
          <HeaderLanding />
          <div className='w-screen h-screen'>
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
