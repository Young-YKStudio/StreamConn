import axios from 'axios'
import { NextResponse } from 'next/server'
import apicalypse from 'apicalypse'

export async function POST(req) {
  const {token} = await req.json()
  const clientId = process.env.TWITCH_DEV_CLIENT

  const config = {
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${token}`,
      'Content-Type': "text/plain"
    },
  }
  
  const body = "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites; sort release_dates.date desc; limit 12;"

  try {
    
    const request = await axios.post(`https://api.igdb.com/v4/games`, body, config)
    return NextResponse.json(
      request.data,
      { status: 200 }
    )
  } catch (err) {
    return console.log(err, 'error')
  }

}