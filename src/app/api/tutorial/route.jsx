'use server'

import Task from '@/app/models/task'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
  console.log('server running')
  const data = await req.json();
  return NextResponse.json({
    req: data
  })
}

export async function GET(req) {
    // const { title } = await req.json();
  
    // await dbConnect();
  
    // try  {
    //   await newTask.save()
    //   return new NextResponse('task created', { status: 200 })
    // } catch (e) {
    //   return new NextResponse(e, { status: 500 })
    // }
}