import { NextRequest, NextResponse } from "next/server";
const { deleteThreadById } = require("../../../db/threads")

export async function POST(req: NextRequest) {
  const body = await req.json()
  await deleteThreadById(body.qid)
  return NextResponse.json({
    successful: true
  })
}