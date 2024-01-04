'use server'

import { NextResponse, NextRequest } from "next/server"

import dbConnect from "@/app/util/DBConnect"
import Task from "@/app/model/task"

export async function POST(req) {
  const data = await req.json();
  return NextResponse.json({
    req: data
  })
} 
export async function GET(req) {
  const data = await req.json();
  return NextResponse.json({
    req: data
  })
} 