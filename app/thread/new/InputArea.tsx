'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const { prettyDate } = require("../../db/basics")

const InputArea = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const router = useRouter()

  return (
    <>
      <div className='flex grow' style={{"padding" : "1em"}}>
        <div className='new-thread-title-holder'> Title : </div>
        <input type="text" className='grow new-thread-textarea-holder'
        onChange={(event) => setTitle(event.target.value)}/>
      </div>

      <div className='flex grow' style={{"padding" : "1em"}}>
        <div className='new-thread-title-holder'> Description : </div>
        <textarea className='grow new-thread-textarea-holder h-[50vh]'
        onChange={(event) => setDesc(event.target.value)}/>
      </div>

      <div className='flex grow items-center justify-center'>
        <input type="button" value="Submit" className='submit-button'
        onClick={() =>
          fetch('http://localhost:3000/api/threads/post-thread', {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({
              title: title,
              content: desc,
              tags: [],
              authorUsername: "mdmab",
              createdAt: prettyDate(new Date())
            })
          }).then(() => {
            router.push('/home')
          })
        }
        />
      </div>
    </>
  )
}

export default InputArea
