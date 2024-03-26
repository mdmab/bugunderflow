import { NextApiRequest } from "next";
import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const { retrieveThreadById } = require("../../../db/threads")

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const qid = url.searchParams.get("qid")
  console.log("[Fetch] Fetching a thread with qid " + qid + "...")

  let response = await retrieveThreadById(qid)

  if (response === null) {
    console.log("[Fetch] Thread with qid " + qid + " not found.")

    return NextResponse.json({
        found: false
    })
  }

  console.log("[Fetch] Thread with qid " + qid + " successfully found.")
  return NextResponse.json({
    found: true,
    thread: response
  })
}