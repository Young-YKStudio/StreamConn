import './globals.css'
import PublicHeader from './components/headers/header/publicHeader'
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
          <PublicHeader />
          <div className='flex flex-row flex-nowrap'>
            <SideBar />
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
