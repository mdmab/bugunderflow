import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
const { deleteReply } = require("../../../db/threads")

export async function POST(req: NextRequest, res: NextApiResponse) {
  console.log("[DELETE] Deleting reply...")
  const body = await req.json()
  await deleteReply(
    body.qid,
    body.aid
  )

  console.log("*** DONE...")
  return NextResponse.json({
    successful: true
  })
}