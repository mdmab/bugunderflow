'use client'

import React from 'react'
import '../globals.css'
import { redirect, useRouter } from 'next/navigation'

const QuestionCard = ({ qid="", question="", user="", time="", replyCount="0", upvotes="0", downvotes="0" } : 
                      { qid: string, question: string, user: string, time: string, replyCount: string,
                        upvotes: string, downvotes: string}) => {
  const router = useRouter()

  return (
    <div className='p-2'>
      <div className='flex-col grow question-card'>
        <div className='question-card-global question hover:underline hover:cursor-grab'
        onClick={() => router.push('/thread/' + qid)}>
          {question}
        </div>
        <div className='question-card-global'> {user} </div>

        <div className='flex place-content-between'>
          <div className='flex place-content-end space-x-2'>
            <div className='question-card-global question-card-info'> {upvotes} </div>
            <div className='question-card-global question-card-info'> {downvotes} </div>
          </div>

          <div className='question-card-global question-card-info'> Replies: {replyCount} </div>
          <div className='question-card-global question-card-info'> {time} </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
