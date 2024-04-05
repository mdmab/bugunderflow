'use client'

import React from 'react'
import '../globals.css'
import { redirect, useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import Tags from '../home_base/Tags'
import Tag from '../home_base/Tag'

async function deleteThread(qid: string, router: AppRouterInstance) {
  await fetch("http://localhost:3000/api/threads/remove-thread", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      qid: qid
    })
  })

  console.log("Refreshing the router...")
  router.push("/home")
}

const QuestionCard = ({ qid="", question="", user="", time="", replyCount="0",
                        upvotes="0", downvotes="0", tags=[] } : 
                      { qid: string, question: string, user: string, time: string, replyCount: string,
                        upvotes: string, downvotes: string, tags: string[]}) => {
  const router = useRouter()

  return (
    <div className='p-2'>
      <div className='flex-col grow question-card'>
        <div className='flex question-card-global question'>
          <div className='flex flex-row grow justify-between'>
            <div className='hover:underline hover:cursor-pointer'
            onClick={() => router.push('/thread/' + qid)}>
              {question}
            </div>
            <img src="/assets/icons/trash_dark.svg" width={20} height={20} className='hover:cursor-pointer'
            onClick={() => {
              deleteThread(qid, router)
              // fetch("http://localhost:3000/api/threads/remove-thread", {
              //   method: "POST",
              //   mode: "cors",
              //   headers: {
              //     "Content-Type" : "application/json"
              //   },
              //   body: JSON.stringify({
              //     qid: qid
              //   })
              // }).then((res) => router.refresh())
            }}/>
          </div>
        </div>

        <Tags words={tags} />

        <div className='question-card-global'> {user} </div>

        <div className='flex place-content-between question-card-global'>
          <div className='flex place-content-end space-x-2'>
            <div className='flex question-card-global question-card-info'>
              <img src="/assets/icons/upvote.svg" width={20} height={20} />
              {upvotes}
            </div>
            <div className='flex question-card-global question-card-info'>
              <img src="/assets/icons/downvote.svg" width={20} height={20} />
              {downvotes}
            </div>
          </div>

          <div className='question-card-global question-card-info'> Replies: {replyCount} </div>
          <div className='question-card-global question-card-info'> {time} </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
