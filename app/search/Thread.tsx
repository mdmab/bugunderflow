import React from 'react'
import Tags from '../home_base/Tags'
import { hardPush, hardRefresh } from '../home_base/util'
import { useUser } from '@clerk/nextjs'

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

const Thread = ({qid="", title="", authorUsername="",
    createdAt="", answerCount="", upvotes="", downvotes="", tags=[], upvoted=false, downvoted=false,
    upvoters=[], downvoters=[]
  } : { 
    qid: string, title: string, authorUsername: string, createdAt: string, answerCount: string,
    upvotes: string, downvotes: string, tags: string[], upvoted: boolean, downvoted: boolean,
    upvoters: string[], downvoters: string[]
  }) => {
  
  const user = useUser()

  return (
    <div className='flex-col grow question-card-global' style={{
      "padding" : "1em 0 0 0"
    }}>
      <div className='flex grow place-content-between hover:underline hover:cursor-pointer question'
      onClick={() => {
        fetch("http://localhost:3000/api/threads/add-view?qid=" + qid, {
          method: "POST",
          mode: "cors"
        })
        hardPush('/thread/' + qid)
      }}>
        <div>
          {title}
        </div>
      </div>

      <div className='sthread-author'>
        {authorUsername}
        <Tags words={tags}/>
      </div>
      
      <div className='flex grow place-content-between w-[80vw] space-x-5'>
      
        <div className='flex w-[10vw] space-x-2'>
          <div className='flex question-card-global question-card-info hover:cursor-pointer hover:bg-gray-200'
          onClick={() => {
            if (user.user?.fullName) {
              if (upvoters.includes(user.user?.fullName)) {
                // upvoters.splice(upvoters.indexOf(user.user?.fullName))
                vote("not up", user.user?.fullName, qid)
              }
              else {
                // upvoters.push(user.user?.fullName)
                vote("up", user.user?.fullName, qid)
              }

              // router.refresh()
              hardRefresh()
            }
          }}>
            <img src={
              upvoters.includes(user.user?.fullName ? user.user?.fullName : "") ?
              "/assets/icons/upvoted.svg": "/assets/icons/upvote.svg"
            }
              width={20} height={20} />
            {upvotes}
          </div>
          <div className='flex question-card-global question-card-info hover:cursor-pointer hover:bg-gray-200'
          onClick={() => {
            if (user.user?.fullName) {
              if (downvoters.includes(user.user?.fullName)) {
                // downvoters.splice(downvoters.indexOf(user.user?.fullName))
                vote("not down", user.user?.fullName, qid)
              }
              else {
                // downvoters.push(user.user?.fullName)
                vote("down", user.user?.fullName, qid)
              }

              hardRefresh()
            }
          }}>
            <img src={
              downvoters.includes(user.user?.fullName ? user.user?.fullName : "") ?
              "/assets/icons/downvoted.svg": "/assets/icons/downvote.svg"
            }
              width={20} height={20} />
            {downvotes}
          </div>
        </div>
      
        <div className='question-card-global question-card-info'>
          Replies: {answerCount}
        </div>
      
        <div className='question-card-global question-card-info'>
          Created at: {createdAt}
        </div>
      </div>

      <div className='flex items-center justify-center h-[4vh]'>
        <hr style={{
          "border" : "1px dashed black",
          "width" : "80vw"
        }} />
      </div>
    </div>
  )
}

export default Thread
