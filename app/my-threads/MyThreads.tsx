'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useEffect, useMemo, useState } from 'react'
import QuestionCard from '../home/QuestionCard'
import { redirect, useRouter } from 'next/navigation'
import { useAuth, useUser } from '@clerk/nextjs'

const MyThreads = () => {
  const [questions, setQuestions] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [userLoaded, setUserLoaded] = useState(false)
  const user = useUser()
  const auth = useAuth()

  useEffect(() => {
    fetch("http://localhost:3000/api/threads/get" + (
      !(auth.isSignedIn && auth.isLoaded && user.user?.fullName) ? "": ("?author=" + user.user?.fullName)
    ), {
      method: "GET",
      mode: "cors",
      headers: {
        'Access-Control-Allow-Origin': "*"
      }
    }).then((res) => res.json()).then((questions) => {
      setQuestions(questions.thread)
      setLoaded(true)
      
      if (auth.isSignedIn && auth.isLoaded && user.user?.fullName) {
        setUserLoaded(true)
      }
      else {
        setUserLoaded(false)
      }
    })
  }, [userLoaded])

  return (
    <div className='flex-col h-[85vh] w-[70vw]'>
      <ScrollArea className='flex-col justify-center h-[85vh] w-[70vw] scroll-area'>
        {
          !loaded && !userLoaded ? <></> :
            questions?.map((ques: { qid: string, title: string, authorUsername: string,
            answerCount: string, createdAt: string, upvotes: string, downvotes: string, tags: string[],
            upvoters: string[], downvoters: string[]
          }) =>
            <QuestionCard key={ques.qid}
            qid={ques.qid} question={ques.title}
            user={ques.authorUsername} time={ques.createdAt}
            replyCount={ques.answerCount}
            upvotes={ques.upvotes} downvotes={ques.downvotes} tags={ques.tags}
            upvoted={true} downvoted={true}
            upvoters={ques.upvoters} downvoters={ques.downvoters}
            />
          )
        }
      </ScrollArea>
    </div>
  )
}

export default MyThreads
