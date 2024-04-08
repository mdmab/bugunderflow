'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { hardPush } from './util'

const SmallQuestionCard = ({ qid="", title="" } : { qid: string, title: string }) => {
  const router = useRouter()

  return (
    <div className='flex grow items-center justify-left'
    style={{
      "padding" : "0.5em",
      "fontFamily" : "Gill Sans, sans-serif",
      "fontSize" : "1.2em"
    }}>
      <div className='flex grow items-left'>
        <div className='w-[0.8vw]'> • </div>
        <div className='hover:cursor-pointer hover:underline' onClick={() => {
          fetch("http://localhost:3000/api/threads/add-view?qid=" + qid, {
            method: "POST",
            mode: "cors"
          })
          router.push("/thread/" + qid)
        }}>
          {title}
        </div>
      </div>
    </div>
  )
}

export default SmallQuestionCard
