import { sendEmail } from "@/app/util/sendEmail";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const {from, to} = await req.json()

  let emailOptions = {
    from: from,
    to: to,
    subject: "Test Email",
    html: "This is a test email from StreamConn"
  }

  try {
    await sendEmail(emailOptions)

    return NextResponse.json(
      {status:200}
    )
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      {message: 'Error sending email'},
      {status: 500}
    )
  }
} 