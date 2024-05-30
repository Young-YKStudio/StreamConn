'use client'
import { useState, useEffect } from 'react'
import { getOneGame } from '@/redux/service/IGDBServices'
import { useSearchParams, useRouter } from 'next/navigation'

const GamePageClient = ({gameSlug}) => {

  const searchParams = useSearchParams()
  const router = useRouter()
  const [ receivedIGDBGameData, setReceivedIGDBGameData ] = useState(null)

  useEffect(() => {
    let callAPI = setTimeout(async () => {
      const gameId = searchParams.get('id')
      const request = await getOneGame(gameSlug, gameId)
      if(request) {
        setReceivedIGDBGameData(request)
      }
    }, 1)

    return () => {
      clearTimeout(callAPI)
    }
  },[])

  const similarGamesLinkHandler = (e, slug, id) => {
    router.push(`/games/${slug}?id=${id}`)
  }

  return (
    <div className="w-full h-full flex flex-col items-center scrollbar-track-sky-950 scrollbar-thumb-white/40">
      <div className='overflow-auto scrollbar-thin w-full h-full pt-16'>
        {/* game info */}
          {/* game image */}
          {receivedIGDBGameData && <div
            className='flex flex-row flex-nowrap'
          >
            {/* left side */}
            <div className='w-[25%] p-4'>
              <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${receivedIGDBGameData.cover.image_id}.jpg`} alt={receivedIGDBGameData.cover.image_id} />
            </div>
            {/* right side */}
            <div className='w-full p-2 py-4 flex flex-col gap-2'>
              <p className='text-3xl font-bold'>{receivedIGDBGameData.name}</p>
              <div className='flex flex-row gap-2'>
                {receivedIGDBGameData.genres.map((genre) => {
                  return <p key={genre.id + ' game genres'} className='bg-white/40 py-1 px-2 text-xs rounded-full flex items-center justify-center'>{genre.name}</p>
                })}
              </div>
              <div>
                <div className='flex flex-col gap-1'>
                  <p className='text-sm font-bold'>Similar games</p>
                  <div className='flex flex-row gap-2 flex-wrap'>
                    {
                      receivedIGDBGameData.similar_games.map((game) => {
                        return <div 
                          key={game.id + ' similar games'} 
                          className='hover:cursor-pointer bg-sky-800/40 rounded-full py-0.5 px-1 hover:bg-sky-600/40'
                          onClick={(e) => similarGamesLinkHandler(e, game.slug, game.id)}
                        >
                          <p className='text-xs py-1 px-2 rounded-full flex items-center justify-center'>{game.name}</p>
                        </div>
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
        {/* our database info */}
        <div>
          <p>Events with the game</p>
          <p>Streamer who are playing the game</p>
        </div>
      </div>
    </div>
  )
}

export default GamePageClient