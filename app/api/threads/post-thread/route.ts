import { NextRequest, NextResponse } from "next/server";
const { retrieveMaxQid, retrieveNextQid } = require("../../../db/threads")

/**
 *  Question:
        title
        content
        tags
        views
        upvotes
        downvotes
        author
        answers
        creation_time
 */

export async function POST(request: NextRequest) {
  const newQid = await retrieveNextQid()

  return NextResponse.json({
    response: "found",
    newQid: newQid
  })
}