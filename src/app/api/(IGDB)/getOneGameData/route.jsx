import axios from 'axios'
import { NextResponse } from 'next/server'
import dbConnect from '@/app/util/DBConnect'
import IGDBToken from '@/app/models/IGDBData'


export async function POST(req) {
  
  const { slug, gameId } = await req.json()

  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 500}
    )
  }


  let clientId = process.env.TWITCH_DEV_CLIENT
  let clientSecret = process.env.TWITCH_DEV_SEC
  let savedTokenId = '664df7330da56a70404db2cb'
  
  let foundToken = await IGDBToken.findById(savedTokenId)

  if(!foundToken) {
    return NextResponse.json(
      {message: 'No token found'},
      {status: 408}
    )
  }

  let initialToken = foundToken.token

  const config = {
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${initialToken}`,
      'Content-Type': "text/plain"
    },
  }

  const sendingBody = `fields *; where id = ${gameId};`

  let IGDBSearchedGame
  let renewedTokenData
  let renewedToken

  try {
    IGDBSearchedGame = await axios.post(`https://api.igdb.com/v4/games`, sendingBody, config)
  } catch (err) {
    console.log('error from IGDB', err)
    if(err.response.status === 401) {
      IGDBSearchedGame = 'token expired'
    }

    if(err.response.status !== 401) {
      return NextResponse.json(
        {message: 'server error from IGDB'},
        {status: 409}
      )
    }
  }

  if(IGDBSearchedGame === 'token expired') {
    try {
      renewedTokenData = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`)
    } catch (err) {
      return NextResponse.json(
        {message: 'server error from getting renewed token from IGDB'},
        {status: err.response.status}
      )
    }

    renewedToken = renewedTokenData.data.access_token

    try {
      await IGDBToken.findByIdAndUpdate(savedTokenId, { token: renewedToken })
    } catch (err) {
      return NextResponse.json(
        {message: 'server error from updating token in database'},
        {status: 408}
      )
    }

    let newConfig = {
      headers: {
        'Client-ID': clientId,
        'Authorization': `Bearer ${renewedToken}`,
        'Content-Type': "text/plain"
      }
    }

    try {
      IGDBSearchedGame = await axios.post(`https://api.igdb.com/v4/games`, sendingBody, newConfig)
    } catch (err) {
      return NextResponse.json(
        {message: 'server error from IGDB'},
        {status: 409}
      )
    }
  }

  return NextResponse.json(
    { searchedGame: IGDBSearchedGame.data },
    { status: 200 }
  )
}