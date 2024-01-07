'use server'

import { NextResponse, NextRequest } from "next/server"

import dbConnect from "@/app/util/DBConnect"
import Task from "@/app/models/task"

export async function POST(req) {
  const { title } = await req.json();

  await dbConnect();

  const newTask = new Task({
    title: title
  })

  try  {
    await newTask.save()
    return new NextResponse('task created', { status: 200 })
  } catch (e) {
    return new NextResponse(e, { status: 500 })
  }
} 