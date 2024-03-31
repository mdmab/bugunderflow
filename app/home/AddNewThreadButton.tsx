'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const AddNewThreadButton = () => {
  const router = useRouter()

  return (
    <div className='flex grow items-center justify-center add-new-thread-button hover:cursor-grab'
    onClick={() => router.push('/thread/new')}>
      Add new thread
    </div>
  )
}

export default AddNewThreadButton
