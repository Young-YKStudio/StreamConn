import './globals.css'
import HeaderLanding from './components/headers/header/HeaderLanding'

import { getServerSession } from 'next-auth'
import SessionProvider from './util/SessionProvider'
import {SocketProvider} from '@/app/util/SocketProvider'
import Providers from '@/redux/reduxProviders'
import SpinnerOverlay from '@/redux/components/loadingParts/spinnerOverlay'
import { Toaster } from 'react-hot-toast'

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
          <SpinnerOverlay />
          <SessionProvider session={session}>
            <SocketProvider>
              <HeaderLanding />
              <div className='w-screen h-screen'>
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
