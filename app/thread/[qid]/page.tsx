'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ThreadPage from './ThreadPage'

const Page = () => {
  const router = useRouter()
  const params = useParams()

  return (
    <div>
      <ThreadPage qid={"" + params.qid.toString()} refreshFunc={() => router.refresh()}/>
    </div>
  )
}

export default Page
