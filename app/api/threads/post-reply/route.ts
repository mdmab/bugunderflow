import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
const { postReply } = require("../../../db/threads")

export async function POST(req: NextRequest, res: NextApiResponse) {
  console.log("[POST] Posting a new reply to the server...")
  // const [qid, aid, content, author, creationTime] = req.body
  const body = await req.json()
  await postReply(body.qid,
                  body.aid,
                  body.content,
                  body.author,
                  body.createdAt)
  console.log("[POST] Posting reply to question (qid " + body.qid + ") successfully done.")
  return NextResponse.json({ successful: true })
}