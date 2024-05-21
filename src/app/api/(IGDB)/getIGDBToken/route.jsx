import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET(req) {

  let clientId = process.env.TWITCH_DEV_CLIENT
  let clientSecret = process.env.TWITCH_DEV_SEC

  try {
    let receivedToken = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`)
    if(receivedToken) {
      return NextResponse.json(
        receivedToken.data.access_token,
        {status: 200}
      )
    }
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { message: 'Error at getting token from IGDB'},
      {status:400}
    )
  }

  return NextResponse.json(
    { message: 'triggered backend get request'},
    { status: 200 }
  )
}