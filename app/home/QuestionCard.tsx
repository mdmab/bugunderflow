'use client'

import React from 'react'
import '../globals.css'
import { redirect, useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import Tags from '../home_base/Tags'
import Tag from '../home_base/Tag'
import { hardRefresh } from '../home_base/util'
import { useUser } from '@clerk/nextjs'

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

async function vote(type: string, name: string, qid: string) {
  await fetch("http://localhost:3000/api/threads/vote", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      type: type,
      name: name,
      qid: qid
    })
  })
}

const QuestionCard = ({ qid="", question="", user="", time="", replyCount="0",
                        upvotes="0", downvotes="0", tags=[], upvoted=false, downvoted=false,
                        upvoters=[], downvoters=[]
                      } : 
                      { qid: string, question: string, user: string, time: string, replyCount: string,
                        upvotes: string, downvotes: string, tags: string[],
                        upvoted: boolean, downvoted: boolean,
                        upvoters: string[], downvoters: string[]
                      }) => {
  const router = useRouter()
  const uuser = useUser()

  return (
    <div className='p-2'>
      <div className='flex-col grow question-card'>
        <div className='flex question-card-global question'>
          <div className='flex flex-row grow justify-between'>
            <div className='hover:underline hover:cursor-pointer'
            onClick={() => {
              fetch("http://localhost:3000/api/threads/add-view?qid=" + qid, {
                method: "POST",
                mode: "cors"
              })
              router.push('/thread/' + qid)
            }}>
              {question}
            </div>
            <img src="/assets/icons/trash_dark.svg" width={20} height={20} className='hover:cursor-pointer'
            onClick={() => {
              deleteThread(qid, router)
              hardRefresh()
            }}/>
          </div>
        </div>

        <div className='question-card-global'> {user} </div>
        <div>
          <Tags words={tags} />
        </div>

        <div className='flex place-content-between question-card-global'>
          <div className='flex place-content-end space-x-2'>
            <div className={
              'flex question-card-global question-card-info ' +
              'hover:cursor-pointer hover:bg-gray-400'
            } onClick={() => {
              if (uuser.user?.fullName) {
                if (upvoters.includes(uuser.user?.fullName)) {
                  // upvoters.splice(upvoters.indexOf(uuser.user?.fullName))
                  vote("not up", uuser.user?.fullName, qid)
                }
                else {
                  // upvoters.push(uuser.user?.fullName)
                  vote("up", uuser.user?.fullName, qid)
                }

                // router.refresh()
                hardRefresh()
              }
            }}>
              <img src={upvoters.includes(
                uuser.user?.fullName ? uuser.user?.fullName : ""
              ) ? "/assets/icons/upvoted.svg": "/assets/icons/upvote.svg"}
                width={20} height={20} />
              {/* {upvotes} */}
              {upvoters.length}
            </div>
            <div className={
              'flex question-card-global question-card-info' +
              'hover:cursor-pointer hover:bg-gray-400'
            } onClick={() => {
              if (uuser.user?.fullName) {
                if (downvoters.includes(uuser.user?.fullName)) {
                  // downvoters.splice(downvoters.indexOf(uuser.user?.fullName))
                  vote("not down", uuser.user?.fullName, qid)
                }
                else {
                  // downvoters.push(uuser.user?.fullName)
                  vote("down", uuser.user?.fullName, qid)
                }

                hardRefresh()
              }
            }}>
              <img src={
                downvoters.includes(
                  uuser.user?.fullName ? uuser.user?.fullName : ""
                ) ? "/assets/icons/downvoted.svg": "/assets/icons/downvote.svg"
              } width={20} height={20} />
              {/* {downvotes} */}
              {downvoters.length}
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
