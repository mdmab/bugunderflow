import { NextRequest, NextResponse } from "next/server";
// import { retrieveThreads } from "../../../db/threads"
// const { MongoClient, Int32 } = require("mongodb")
const { retrieveThreads, getAnswerCountByQid } = require("../../../db/threads")

export async function GET() {
  console.log("[Fetch] Fetching the list of threads...")
  return NextResponse.json(await retrieveThreads())
}