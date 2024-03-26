import { useRouter } from 'next/navigation'
import React from 'react'

const trashIconSize = 17

async function deleteAnswer(qid_: number, aid_: number) {
  fetch("http://localhost:3000/api/threads/remove-reply", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      qid: qid_,
      aid: aid_,
    })
  })
}

const AnswerCard = ({ qid=0, aid=0, author="", content="", upvotes=0, downvotes=0, creationTime="" } :
                    {qid: number, aid: number, author: string, content: string,
                     upvotes: number, downvotes: number, creationTime: string}) => {
  const router = useRouter()

  return (
    <div className='grow answer-card'>
      <div style={{
        "padding" : "0.2em 0",
        "color" : "rgb(60, 60, 60)",
        "fontWeight" : "bold",
        "fontSize" : "1.2em",
        "borderWidth" : "0.1em 0",
        "borderColor" : "black"
      }}> {author} </div>
      <div style={{
        "padding" : "1.2em 0"
      }}>
        <div> {content} </div>
        <div className='flex grow space-content-between' style={{ "fontWeight" : "bold" }}>
          <div className='flex space-x-5'>
            <div className='hover:bg-gray-200' style={{ "padding": "0.2em" }}> {upvotes} </div>
            <div className='hover:bg-gray-200' style={{ "padding": "0.2em" }}> {downvotes} </div>
            <div className='hover:bg-gray-200' style={{ "padding": "0.2em" }} onClick={() => {
              deleteAnswer(qid, aid)
              router.refresh()
            }}
            >
              <img src="/assets/icons/trash_dark.svg" height={trashIconSize} width={trashIconSize + 5} />
            </div>
          </div>
          <div className='flex grow place-content-end'> {creationTime} </div>
        </div>
      </div>
    </div>
  )
}

export default AnswerCard
