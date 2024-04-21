import dbConnect from "@/app/util/DBConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  const receivedData = await req.json()

  console.log(receivedData);

  return NextResponse.json({status: 200})
}