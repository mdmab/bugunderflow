'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ThreadPage from './ThreadPage'
import NavigationBar from '@/app/home_base/NavigationBar'
import { NAV_NONE } from '@/app/home_base/constants'

const Page = () => {
  const router = useRouter()
  const params = useParams()

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/threads/add-view?qid=" + params.qid.toString(), {
  //     method: "POST",
  //     mode: "cors"
  //   })
  // }, [])

  return (
    <div>
      <ThreadPage qid={"" + params.qid.toString()} refreshFunc={() => router.refresh()}/>
    </div>
  )
}

export default Page
