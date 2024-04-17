import { NextRequest, NextResponse } from "next/server";
const { addToUpvoters, removeFromUpvoters,
  addToDownvoters, removeFromDownvoters } = require("../../../db/threads")

export async function POST(req: NextRequest) {
  const body = await req.json()

  const type = body.type
  const qid = body.qid
  const name = body.name

  if (type == "up") {
    addToUpvoters(name, qid)
    removeFromDownvoters(name, qid)
  }
  else if (type == "not up") {
    removeFromUpvoters(name, qid)
  }
  else if (type == "not down") {
    removeFromDownvoters(name, qid)
  }
  else {
    addToDownvoters(name, qid)
    removeFromUpvoters(name, qid)
  }

  return NextResponse.json({
    success: true
  })
}