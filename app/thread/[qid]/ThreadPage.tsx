import TopbarPc from '@/app/home_base/TopbarPc'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import AnswerCard from './AnswerCard'
import NavigationBar from '@/app/home_base/NavigationBar'
import { NAV_NONE } from '@/app/home_base/constants'
import Tags from '@/app/home_base/Tags'
import { hardRefresh } from '@/app/home_base/util'
import { useUser } from '@clerk/nextjs'

const serverUrl = "localhost"

async function fetchQuestionByQid(id: string) {
    // http://0.0.0.0:3000/
  return (await fetch("http://" + serverUrl + ":3000/api/threads/get?qid=" + id, {
    method: "GET",
    mode: "cors",
    // headers: {
    //   'Access-Control-Allow-Origin': "*",
    //   'Access-Control-Allow-Methods': 'GET, POST, PUT'
    // }
  })).json()  // An single question, in js object format...
}
  
let reply = ""

const postReply = async (qid_: string, aid_: string, author_: string,
  content_: string, date: Date) => {
  fetch("http://" + serverUrl + ":3000/api/threads/post-reply", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type" : "application/json",
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

const prettyDate = (date: Date) => {
  let day: string = (date.getDate() < 10 ? "0" : "") + date.getDate()
  let month: string = ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1)
  let year: string = (date.getFullYear() < 10 ? "0" : "") + date.getFullYear()

  let hours: string = (date.getHours() < 10 ? "0" : "") + date.getHours()
  let minutes: string = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
  let seconds: string = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds()

  return "" + day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds
}

const ThreadPage = async ({qid="0", refreshFunc, fullName} : {qid: string, refreshFunc: () => any,
  fullName: string | null | undefined}) => {
  const quesThread = await fetchQuestionByQid(qid)
  const ansList = quesThread.thread.answers.sort((ans: {aid: number}, ans2: {aid: number}) =>
                 ans2.aid - ans.aid)
  const maxAid = ansList === null || ansList === undefined || ansList.length === 0 ? 0: ansList[0].aid

  return (
    <div className='flex-col h-[100vh]'>
      <TopbarPc />
      <div className='flex grow w-[100vw]'>
        <NavigationBar mode={NAV_NONE} />

        <ScrollArea className='flex-col grow justify-center h-[85vh] w-[85vw] thread-scroll-area'>
          <div className='flex-col grow'>
            <div className='thread-question'> {quesThread.thread.title} </div>
            <div style={{"fontStyle" : "italic"}}> by {quesThread.thread.authorUsername} </div>
            <Tags words={quesThread.thread.tags} />
            <div className='thread-desc'> {quesThread.thread.content} </div>
            
            <div className='flex grow place-content-between items-center thread-misc'>
              <div className='flex grow space-x-2'>
                
                <div className='flex hover:cursor-pointer hover:bg-gray-300'
                onClick={() => {
                  if (fullName) {
                    if (quesThread.thread.upvoters.includes(fullName)) {
                      // upvoters.splice(upvoters.indexOf(fullName))
                      vote("not up", fullName, qid)
                    }
                    else {
                      // upvoters.push(fullName)
                      vote("up", fullName, qid)
                    }
      
                    // router.refresh()
                    refreshFunc()
                  }
                }}>
                  <img src={
                    quesThread.thread.upvoters.includes(fullName ? fullName : "") ?
                    "/assets/icons/upvoted.svg": "/assets/icons/upvote.svg"
                  } width={20} height={20} />
                  {quesThread.thread.upvoters.length}
                </div>

                <div className='flex hover:cursor-pointer hover:bg-gray-300'
                onClick={() => {
                  if (fullName) {
                    if (quesThread.thread.downvoters.includes(fullName)) {
                      // downvoters.splice(downvoters.indexOf(fullName))
                      vote("not down", fullName, qid)
                    }
                    else {
                      // downvoters.push(fullName)
                      vote("down", fullName, qid)
                    }
      
                    refreshFunc()
                  }
                }}>
                  <img src={
                    quesThread.thread.downvoters.includes(fullName ? fullName : "") ?
                    "/assets/icons/downvoted.svg": "/assets/icons/downvote.svg"
                  } width={20} height={20} />
                  {quesThread.thread.downvoters.length}
                </div>

              </div>
              <div className='flex grow place-content-end space-x-20'>
                <div> Views: {quesThread.thread.views} </div>
                <div> Creation time: {quesThread.thread.createdAt} </div>
              </div>
            </div>

            <div className='flex grow items-center justify-center' style={{ "padding" : "2em 0" }}>
              <textarea name='comment-box' className='comment-box h-[20vh] w-[50vw]'
              onChange={(event) => {reply = event.target.value}}/>
              
              <button className='comment-button'
              onClick={() => {
                postReply(qid, maxAid + 1, "mdmab_sust", reply, new Date())
                // refreshFunc()
                hardRefresh()
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
                <AnswerCard key={ans.aid} qid={Number(qid)} aid={ans.aid}
                author={ans.authorUsername} content={ans.content}
                upvotes={ans.upvotes} downvotes={ans.downvotes} creationTime={ans.createdAt}/>
              )
            }
            </div>

            <div style={{ "padding" : "2em" }}></div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default ThreadPage
