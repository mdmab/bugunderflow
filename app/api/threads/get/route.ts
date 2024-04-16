import { NextApiRequest } from "next";
import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const { retrieveThreadById, retrieveThreadsByAuthor, retrieveThreadsByQidAndAuthor } = require("../../../db/threads")

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const qid = url.searchParams.get("qid")
  const author = url.searchParams.get("author")

  if (qid !== undefined && qid !== null && (author === undefined || author === null)) {
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
      thread: response,
      headers: {
        'Access-Control-Allow-Origin': "*"
      }
    })
  }
  else if (author !== undefined && author !== null && (qid === undefined || qid === null)) {
    let res = await retrieveThreadsByAuthor(author)

    if (res === null) {
      return NextResponse.json({
        found: false
     })
    }

    return NextResponse.json({
      found: true,
      thread: res,
      headers: {
        'Access-Control-Allow-Origin': "*"
      }
    })
  }
  else if ((qid === undefined || qid === null) && (author === undefined || author === null)) {
    return NextResponse.json({
      found: false
    })
  }


  let res = await retrieveThreadsByQidAndAuthor(qid, author)

  if (res === null) {
    return NextResponse.json({
      found: false
    })
  }

  return NextResponse.json({
    found: true,
    thread: res,
    headers: {
      'Access-Control-Allow-Origin': "*"
    }
  })
}