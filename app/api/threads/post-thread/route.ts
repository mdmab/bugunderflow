import { NextRequest, NextResponse } from "next/server";
const { retrieveMaxQid, retrieveNextQid, postThread } = require("../../../db/threads")

/**
 *  Question:
        qid
        title
        content
        tags
        views
        upvotes
        upvoters
        downvotes
        downvoters
        authorUsername
        answers
        createdAt
 */

export async function POST(request: NextRequest) {
  const body = await request.json()
  await postThread(body.title, body.content, body.tags, body.authorUsername, body.createdAt)

  return NextResponse.json({
    successful: true
  })
}