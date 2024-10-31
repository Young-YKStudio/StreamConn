import dbConnect from '@/app/util/DBConnect'
import User from '@/app/models/User'
import Collarboration from '@/app/models/Collarborations'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const receivedData = await req.json()

  return NextResponse.json(
    receivedData,
    {status: 200}
  )
}

// need logged user info