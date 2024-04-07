import { NextRequest, NextResponse } from "next/server";
const { search } = require("../../db/threads")

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const searchString = url.searchParams.get("string")
  const records = await search(searchString)
  const newRecords = records.map((rec: {title: string}) => {
    let words = searchString?.split(" ").filter(word => word !== "")
    let cnt = 0

    words?.forEach(word => {
      // if (rec.)
      // Counting...
    })
  })

  return NextResponse.json(records)
}