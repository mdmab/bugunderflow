'use client'

import React, { useEffect, useState } from 'react'
import SmallQuestionCard from './SmallQuestionCard'

const MostViewedThreads = () => {
  const [threads, setThreads] = useState<{ qid: string, title: string }[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    fetch("http://localhost:3000/api/threads/get-most-viewed-threads", {
      method: "GET",
      mode: "cors"
    }).then(res => res.json()).then((threads: {qid: string, title: string}[]) => {
      setThreads(threads)
      setLoaded(true)
    })
  }, [])

  return (
    <div className='flex-col grow most-viewed-thread-list'>
      <div className='flex grow items-center justify-center' style={{
        "fontWeight" : "bold",
        // "margin" : "1em 0 0 0",
        "padding" : "1em",
        "borderWidth" : "0.2em 0"
      }}>
        Most viewed threads
      </div>
      {
        !loaded ? <></> : threads.map((thread: {qid: string, title: string}) => {
          return <SmallQuestionCard qid={thread.qid} title={thread.title} />
        })
      }
    </div>
  )
}

export default MostViewedThreads
