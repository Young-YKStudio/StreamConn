'use client'
import { useState, useEffect } from 'react'
import { getOneGame } from '@/redux/service/IGDBServices'
import { useSearchParams } from 'next/navigation'

const GamePageClient = ({gameSlug}) => {

  const searchParams = useSearchParams()

  useEffect(() => {
    let callAPI = setTimeout(async () => {
      const gameId = searchParams.get('id')
      const request = await getOneGame(gameSlug, gameId)
    }, 1)

    return () => {
      clearTimeout(callAPI)
    }
  },[])

  return (
    <div className="pt-16">
      <p>Game Page, {gameSlug}</p>
    </div>
  )
}

export default GamePageClient