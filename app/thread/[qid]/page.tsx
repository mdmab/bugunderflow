'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ThreadPage from './ThreadPage'
import NavigationBar from '@/app/home_base/NavigationBar'
import { NAV_NONE } from '@/app/home_base/constants'

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
