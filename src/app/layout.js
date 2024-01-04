import './globals.css'
import PublicHeader from './components/headers/header/publicHeader'
import SideBar from './components/sidebar/sideBar'

export const metadata = {
  title: 'Stream Connect',
  description: 'asdf',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='text-white bg-black'>
        <PublicHeader />
        <div className='flex flex-row flex-nowrap'>
          <SideBar />
          {children}
        </div>
      </body>
    </html>
  )
}
