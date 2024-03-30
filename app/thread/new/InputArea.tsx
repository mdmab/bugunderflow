'use client'

import React, { useState } from 'react'

const InputArea = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")

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
        onClick={() => alert(title + "\n" + desc + "\n")}/>
      </div>
    </>
  )
}

export default InputArea
