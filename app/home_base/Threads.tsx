'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useEffect, useMemo, useState } from 'react'
import QuestionCard from '../home/QuestionCard'
import { redirect, useRouter } from 'next/navigation'

const Threads = () => {
  const [questions, setQuestions] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3000/api/threads/get-all", {
      method: "GET",
      mode: "cors",
      headers: {
        'Access-Control-Allow-Origin': "*"
      }
    }).then((res) => res.json()).then((questions) => {
      setQuestions(questions)
      setLoaded(true)
    })
  }, [])

  return (
    <div className='flex-col h-[85vh] w-[70vw]'>
      <ScrollArea className='flex-col justify-center h-[85vh] w-[70vw] scroll-area'>
        {
          !loaded ? <></> : questions?.map((ques: { qid: string, title: string, authorUsername: string,
            answerCount: string, createdAt: string, upvotes: string, downvotes: string, tags: string[] }) =>
            <QuestionCard key={ques.qid}
            qid={ques.qid} question={ques.title}
            user={ques.authorUsername} time={ques.createdAt}
            replyCount={ques.answerCount}
            upvotes={ques.upvotes} downvotes={ques.downvotes} tags={ques.tags}/>
          )
        }
      </ScrollArea>
    </div>
  )
}

export default Threads
