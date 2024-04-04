'use client'

import { ButtonIcon } from '@radix-ui/react-icons'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'

const Menubar = () => {
  const router = useRouter()

  return (
    <div className='flex gap-5'>
      <button className='menu-button' onClick={() => router.push('/home')}> Home </button>
      <button className='menu-button' onClick={() => router.push('/community')}> Community </button>
      <button className='menu-button' onClick={() => router.push('/find-jobs')}> Find Jobs </button>
      <button className='menu-button' onClick={() => router.push('/profile')}> Profile </button>
    </div>
  )
}

export default Menubar
