import { NextResponse } from "next/server"

const { retrieveThreadsSortedByView } = require("../../../db/threads")

export async function GET() {
  const records = await retrieveThreadsSortedByView()
  return NextResponse.json(records)
}