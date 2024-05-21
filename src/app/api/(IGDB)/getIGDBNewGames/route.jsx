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
      'Content-Type': "application/json"
    },
    data: "fields *; sort release_dates.date desc; limit 12;"
  }
  
  const tempData = {
    body: "fields *; sort release_dates.date desc; limit 12;"
  }

  try {

    const request = await apicalypse({
      queryMethod: 'url',
      method: 'post',
      baseURL: 'https://api.igdb.com/v4/games',
      headers: {
        'Accept': 'application/json',
        'Client-ID': clientId,
        'Authorization': `Bearer ${token}`
      },
      responseType: 'json',
      body: "fields *; sort release_dates.date desc; limit 12;"
    })

    console.log(request)
    // const request = await fetch(`https://api.igdb.com/v4/games`, {
    //   method: "POST",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Client-ID': clientId,
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: "fields *; sort release_dates.date desc; limit 12;"
    // })

    // console.log(request.json())

    // const request = await axios.post(`https://api.igdb.com/v4/games`, tempData, config)
    // return NextResponse.json(
    //   request.data,
    //   { status: 200 }
    // )
    // console.log(request.data, 'successful call')
  } catch (err) {
    return console.log(err, 'error')
  }

  return NextResponse.json(
    { message: 'triggered backend post request'},
    { status: 200 }
  )
}