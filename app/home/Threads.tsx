import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useEffect, useMemo, useState } from 'react'
import QuestionCard from './QuestionCard'
import { redirect } from 'next/navigation'

async function fetchQuestions() {
  // let response = await fetch("http://localhost:4000/api/threads/get-all", {
  //   method: "GET",
  //   mode: "cors"
  // })  // An array of questions (jsons)

  // let r = response.json()
  return (await fetch("http://localhost:3000/api/threads/get-all", {
    method: "GET",
    mode: "cors"
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
        {/* <QuestionCard question={"" + questions.length}
                      user="user-1" time="00:00:00"
                      replyCount="100" upvotes="10" downvotes="10" /> */}
        {/* <QuestionCard question="What is a lazy fox without a tail called?"
                      user="user-1" time="00:00:00"
                      replyCount="100" upvotes="10" downvotes="10" />
        <QuestionCard question="How to make a makefile, huh?"
                      user="user-2" time="00:01:00"
                      replyCount="420" upvotes="10" downvotes="100" />
        <QuestionCard question="How to make a makefile, huh?"
                      user="user-2" time="00:01:00"
                      replyCount="420" upvotes="10" downvotes="100" />
        <QuestionCard question="How to make a makefile, huh?"
                      user="user-2" time="00:01:00"
                      replyCount="420" upvotes="10" downvotes="100" />
        <QuestionCard question="How to make a makefile, huh?"
                      user="user-2" time="00:01:00"
                      replyCount="420" upvotes="10" downvotes="100" />
        <QuestionCard question="How to make a makefile, huh?"
                      user="user-2" time="00:01:00"
                      replyCount="420" upvotes="10" downvotes="100" />
        <QuestionCard question="How to make a makefile, huh?"
                      user="user-2" time="00:01:00"
                      replyCount="420" upvotes="10" downvotes="100" />
        <QuestionCard question="How to make a makefile, huh?"
                      user="user-2" time="00:01:00"
                      replyCount="420" upvotes="10" downvotes="100" />
        <QuestionCard question="How to make a makefile, huh?"
                      user="user-2" time="00:01:00"
                      replyCount="420" upvotes="10" downvotes="100" />
        <QuestionCard question="How to make a makefile, huh?"
                      user="user-2" time="00:01:00"
                      replyCount="420" upvotes="10" downvotes="100" />
        <QuestionCard question="How to make a makefile, huh?"
                      user="user-2" time="00:01:00"
                      replyCount="420" upvotes="10" downvotes="100" />
        <QuestionCard question="How to make a makefile, huh?"
                      user="user-2" time="00:01:00"
                      replyCount="420" upvotes="10" downvotes="100" />
        <QuestionCard question="How to make a makefile, huh?"
                      user="user-2" time="00:01:00"
                      replyCount="420" upvotes="10" downvotes="100" /> */}
      </ScrollArea>
    </div>
  )
}

export default Threads
