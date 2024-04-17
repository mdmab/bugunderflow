'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import ThreadPage from './ThreadPage'
import NavigationBar from '@/app/home_base/NavigationBar'
import { NAV_NONE } from '@/app/home_base/constants'
import { useUser } from '@clerk/nextjs'

const Page = () => {
  const router = useRouter()
  const params = useParams()
  const user = useUser()

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/threads/add-view?qid=" + params.qid.toString(), {
  //     method: "POST",
  //     mode: "cors"
  //   })
  // }, [])

  return (
    <div>
      <ThreadPage qid={"" + params.qid.toString()} refreshFunc={() => router.refresh()}
        fullName={user.user?.fullName ? user.user?.fullName : undefined} />
    </div>
  )
}

export default Page
