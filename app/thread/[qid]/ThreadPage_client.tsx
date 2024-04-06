import TopbarPc from '@/app/home_base/TopbarPc'
import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useEffect, useState } from 'react'
import AnswerCard from './AnswerCard'
import NavigationBar from '@/app/home_base/NavigationBar'
import { NAV_NONE } from '@/app/home_base/constants'
import Tags from '@/app/home_base/Tags'
import { useRouter } from 'next/navigation'

const serverUrl = "localhost"

function postReply (qid_: string, aid_: string, author_: string,
  content_: string, date: Date) {
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

function prettyDate (date: Date) {
  let day: string = (date.getDate() < 10 ? "0" : "") + date.getDate()
  let month: string = ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1)
  let year: string = (date.getFullYear() < 10 ? "0" : "") + date.getFullYear()

  let hours: string = (date.getHours() < 10 ? "0" : "") + date.getHours()
  let minutes: string = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
  let seconds: string = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds()

  return "" + day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds
}

const ThreadPage = ({qid="0", refreshFunc} : {qid: string, refreshFunc: () => any}) => {
  const [quesThread, setQuesThread] = useState<{
    thread: {
      qid: number,
      title: string,
      authorUsername: string,
      tags: [],
      content: string,
      views: number,
      upvoters: [],
      downvoters: [],
      upvotes: number,
      downvotes: number,
      createdAt: string,
      answerCount: number,
      answers: {
        aid: number,
        authorUsername: string,
        content: string,
        upvotes: number,
        downvotes: number,
        createdAt: string
      }[]
    }
  }>()
  const [ansList, setAnsList] = useState<{aid: number}[]>([])
  const [maxAid, setMaxAid] = useState<number>(0)
  const [reply, setReply] = useState<string>("")

  const router = useRouter()

  useEffect(() => {
    fetch("http://" + serverUrl + ":3000/api/threads/get?qid=" + qid, {
      method: "GET",
      mode: "cors"
    })
    .then((res) => res.json())  // An single question, in js object format...
    .then((quesThread: {
      thread: {
        qid: number,
        title: string,
        authorUsername: string,
        tags: [],
        content: string,
        views: number,
        upvoters: [],
        downvoters: [],
        upvotes: number,
        downvotes: number,
        createdAt: string,
        answerCount: number,
        answers: {
          aid: number,
          authorUsername: string,
          content: string,
          upvotes: number,
          downvotes: number,
          createdAt: string
        }[],
      }
    }) => {
      setQuesThread(quesThread)
      setAnsList(quesThread.thread.answers.sort((ans: {aid: number}, ans2: {aid: number}) =>
        ans2.aid - ans.aid)
      )
      setMaxAid(ansList === null || ansList === undefined || ansList.length === 0 ? 0: ansList[0].aid)
    })
  }, [])

  if (quesThread === undefined || ansList === undefined || maxAid === undefined) {
    return (
      <></>
    )
  }

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
                <div className='flex'>
                  <img src="/assets/icons/upvote.svg" width={20} height={20} />
                  {quesThread.thread.upvotes}
                </div>
                <div className='flex'>
                  <img src="/assets/icons/downvote.svg" width={20} height={20} />
                  {quesThread.thread.downvotes}
                </div>
              </div>
              <div className='flex grow place-content-end space-x-20'>
                <div> Views: {quesThread.thread.views} </div>
                <div> Creation time: {quesThread.thread.createdAt} </div>
              </div>
            </div>

            <div className='flex grow items-center justify-center' style={{ "padding" : "2em 0" }}>
              <textarea name='comment-box' className='comment-box h-[20vh] w-[50vw]'
              onChange={(event) => {setReply(event.target.value)}}/>
              
              <button className='comment-button'
              onClick={() => {
                postReply(qid, (maxAid + 1).toString(), "mdmab_sust", reply, new Date())
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
