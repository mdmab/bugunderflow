'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import ThemeChooser from './ThemeChooser'
import Logo from './Logo'
import Menubar from './Menubar'

const TopbarPc = () => {
  return (
    <div className="flex items-center justify-between p-5 h-[15vh] w-[100vw] border-2">
      <Logo />
      <Menubar />
      <ThemeChooser />
    </div>
  )
}

export default TopbarPc
