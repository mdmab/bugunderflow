import { NextRequest, NextResponse } from "next/server";

const { addView } = require("../../../db/threads")

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const qid = url.searchParams.get("qid")

  await addView(qid)

  return NextResponse.json({
    ok: true
  })
}