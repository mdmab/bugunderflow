'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import TopbarPc from '../home_base/TopbarPc'
import Thread from './Thread'
import { ScrollArea } from '@/components/ui/scroll-area'

const page = () => {
  const searchParams = useSearchParams()
  const searchString = searchParams.get("string")
  const [threads, setThreads] = useState<
    { 
      qid: string, title: string, authorUsername: string, createdAt: string, answerCount: string,
      upvotes: string, downvotes: string, tags: string[]
    }[]
  >()

  useEffect(() => {
    fetch("http://localhost:3000/api/search?string=" + searchString?.split(" ")
                                                                    .filter((word: string) => word != "")
                                                                    .join("+"), {
      method: "GET",
      mode: "cors"
    }).then(res => res.json()).then((res: { 
      qid: string, title: string, authorUsername: string, createdAt: string, answerCount: string,
      upvotes: string, downvotes: string, tags: string[]
    }[]) => {
      setThreads(res)
    })
  }, [])

  return (
    <div>
      <TopbarPc />
      <ScrollArea>
        <div className='flex grow items-center justify-center'>
          <div className='flex-col items-center justify-center'>
            {threads?.map((thread: { 
              qid: string, title: string, authorUsername: string, createdAt: string, answerCount: string,
              upvotes: string, downvotes: string, tags: string[]
            }) => <Thread qid={thread.qid} title={thread.title} authorUsername={thread.authorUsername} 
                          createdAt={thread.createdAt} upvotes={thread.upvotes} downvotes={thread.downvotes}
                          tags={thread.tags} answerCount={thread.answerCount}
            />)}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default page
