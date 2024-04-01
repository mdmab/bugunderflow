'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useEffect, useMemo, useState } from 'react'
import QuestionCard from './QuestionCard'
import { redirect, useRouter } from 'next/navigation'

// async function fetchQuestions() {
//   return (await fetch("http://localhost:3000/api/threads/get-all", {
//     method: "GET",
//     mode: "cors",
//     headers: {
//       'Access-Control-Allow-Origin': "*"
//     }
//   })).json()
// }

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
    <div className='flex-col h-[85vh] w-[80vw]'>
      <ScrollArea className='flex-col justify-center h-[85vh] w-[80vw] scroll-area'>
        {
          !loaded ? <></> : questions?.map((ques: { qid: string, title: string, authorUsername: string,
            answerCount: string, createdAt: string }) =>
            <QuestionCard key={ques.qid}
            qid={ques.qid} question={ques.title}
            user={ques.authorUsername} time={ques.createdAt}
            replyCount={ques.answerCount} upvotes="10" downvotes="10"/>
          )
        }
      </ScrollArea>
    </div>
  )
}

export default Threads
