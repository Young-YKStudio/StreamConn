import './globals.css'
import SideBarServerSide from './components/sidebar/sideBarServerSide'

import { getServerSession } from 'next-auth'
import SessionProvider from './util/SessionProvider'
import {SocketProvider} from '@/app/util/SocketProvider'
import Providers from '@/redux/reduxProviders'
import SpinnerOverlay from '@/redux/components/loadingParts/spinnerOverlay'
import { Toaster } from 'react-hot-toast'

// font
import { Kanit, Squada_One } from 'next/font/google'

export const metadata = {
  title: 'Stream Connect',
  description: 'Where all streamers and viewers meet',
}

const squadaOne = Squada_One({
  weight:['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-squadaOne'
})

const kanit = Kanit({
  weight:['100', '200', '300', '400', '500', '600', '700', '800', '900',],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kanit'
})

export default async function RootLayout({ children }) {

  const session = await getServerSession()

  return (
    <html lang="en" className={`${kanit.variable} ${squadaOne.variable}`}>
      <body className='text-zinc-700 font-kanit tracking-wide'>
        <Providers>
          <SpinnerOverlay />
          <SessionProvider session={session}>
            <SocketProvider>
              <div className='w-screen h-screen flex flex-col md:flex-row relative'>
                <SideBarServerSide />
                <Toaster 
                  position='bottom-right' 
                  gutter={8}
                  toastOptions={{
                    className: '',
                    style: {
                      background: '#082f49',
                      color: 'white'
                    },
                    success: {
                      style: {
                        background: '#134e4a',
                      }
                    },
                    error: {
                      style: {
                        background: '#a16207',
                      }
                    }
                  }}
                />
                  {children}
              </div>
            </SocketProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  )
}
