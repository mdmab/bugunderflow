'use client'

import TopbarPc from '@/app/home/TopbarPc'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { redirect, useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AnswerCard from './AnswerCard'
import { auth } from '@clerk/nextjs'

async function fetchQuestionByQid(id: string) {
  return (await fetch("http://localhost:3000/api/threads/get?qid=" + id, {
    method: "GET",
    mode: "cors"
  })).json()  // An single question, in js object format...
}

let reply = ""

const prettyDate = (date: Date) => {
  let day: string = (date.getDate() < 10 ? "0" : "") + date.getDate()
  let month: string = ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1)
  let year: string = (date.getFullYear() < 10 ? "0" : "") + date.getFullYear()

  let hours: string = (date.getHours() < 10 ? "0" : "") + date.getHours()
  let minutes: string = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
  let seconds: string = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds()

  return "" + day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds
}

const Page = async () => {
  const router = useRouter()
  const params = useParams()
  const quesThread = await fetchQuestionByQid(params.qid.toString())
  
  const ansList = quesThread.thread.answers.sort((ans: {aid: number}, ans2: {aid: number}) =>
                 ans2.aid - ans.aid)
  const maxAid = ansList === null || ansList === undefined || ansList.length === 0 ? 0: ansList[0].aid

  // let reply = ""
  const postReply = (qid_: string, aid_: string, author_: string,
                     content_: string, date: Date) => {
    fetch("http://localhost:3000/api/threads/post-reply", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        qid: qid_,
        aid: aid_,
        author: author_,
        content: content_,
        createdAt: prettyDate(date)
      })
    })
  }

  return (
    <div className='flex-col h-[100vh]'>
      <TopbarPc />
      <ScrollArea className='flex-col grow justify-center h-[85vh] w-[100vw] thread-scroll-area'>
        <div className='flex-col grow'>
          <div className='thread-question'> {quesThread.thread.title} </div>
          <div> by {quesThread.thread.authorUsername} </div>
          <div className='thread-desc'> {quesThread.thread.content} </div>
          
          <div className='flex grow place-content-between items-center thread-misc'>
            <div className='flex grow space-x-2'>
              <div> {quesThread.thread.upvotes} </div>
              <div> {quesThread.thread.downvotes} </div>
            </div>
            <div className='flex grow place-content-end space-x-5'>
              <div> Views: {quesThread.thread.views} </div>
              <div> Creation time: {quesThread.thread.createdAt} </div>
            </div>
          </div>

          <div className='flex grow items-center justify-center' style={{ "padding" : "2em 0" }}>
            <textarea name='comment-box' className='comment-box h-[20vh] w-[50vw]'
            onChange={(event) => {reply = event.target.value}}/>
            
            <button className='comment-button'
            onClick={() => {
              postReply(params.qid.toString(), maxAid + 1, "anirbansust", reply,
              (new Date()))
              router.refresh()
            }}>
              Comment
            </button>
          </div>

          <div className='flex-col grow justify-center'>
          {
            quesThread.thread.answers.sort((ans: {aid: number}, ans2: {aid: number}) => ans2.aid - ans.aid)
            .map((ans : {aid: number, authorUsername: string, content: string,
              upvotes: number, downvotes: number, createdAt: string
            }) =>
              <AnswerCard key={ans.aid} qid={Number(params.qid)} aid={ans.aid}
              author={ans.authorUsername} content={ans.content}
              upvotes={ans.upvotes} downvotes={ans.downvotes} creationTime={ans.createdAt}/>
            )
          }
          </div>

          <div style={{ "padding" : "2em" }}></div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default Page
