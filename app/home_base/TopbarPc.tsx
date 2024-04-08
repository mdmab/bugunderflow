'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import ThemeChooser from './ThemeChooser'
import Logo from './Logo'
import Menubar from './Menubar'
import SearchBar from './SearchBar'
import { UserButton, useAuth, useClerk, useUser } from '@clerk/nextjs'

const TopbarPc = () => {
  const auth = useAuth()
  const user = useUser()
  const clerk = useClerk()

  return (
    <div className="flex items-center justify-between p-5 h-[15vh] w-[100vw] border-2">
      <Logo />
      {/* <Menubar /> */}
      <SearchBar />
      <div className='flex space-x-5'>
        <ThemeChooser />
        <UserButton />
        <div>
          {auth.isSignedIn ? user.user?.fullName: "NONE"}
        </div>
      </div>
    </div>
  )
}

export default TopbarPc
