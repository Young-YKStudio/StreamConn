'use client'

import Landing from "./components/pages/landing/page"

import { redirect } from 'next/navigation'

export default async function Home() {

  return (
    <div>
      <Landing />
    </div>
  )
}
