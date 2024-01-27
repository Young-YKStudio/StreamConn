'use client'

import Landing from "./components/pages/landing/page"

import { redirect } from 'next/navigation'
import { auth } from '../../auth'

export default async function Home() {

  const session = await auth()
  if(!session) redirect('/register')

  return (
    <div>
      <Landing />
    </div>
  )
}
