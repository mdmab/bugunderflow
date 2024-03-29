import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useEffect, useMemo, useState } from 'react'
import QuestionCard from './QuestionCard'
import { redirect } from 'next/navigation'

async function fetchQuestions() {
  return (await fetch("http://0.0.0.0:3000/api/threads/get-all", {
    method: "GET",
    mode: "cors",
    headers: {
      'Access-Control-Allow-Origin': "*"
    }
  })).json()
}

const Threads = async () => {
  const questions = await fetchQuestions()

  return (
    <div className='flex-col h-[85vh] w-[80vw]'>
      <ScrollArea className='flex-col justify-center h-[85vh] w-[80vw] scroll-area'>
        {
          questions.map((ques: { qid: string, title: string; authorUsername: string; createdAt: string }) =>
            <QuestionCard key={ques.qid}
            qid={ques.qid} question={ques.title}
            user={ques.authorUsername} time={ques.createdAt}
            replyCount="100" upvotes="10" downvotes="10"/>
          )
        }
      </ScrollArea>
    </div>
  )
}

export default Threads
