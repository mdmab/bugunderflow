'use client'

import React, { useState } from 'react'
import LogoMobile from './LogoMobile'

const TopbarMobile = () => {
  return (
    <div className="flex items-center justify-between p-5 h-[15vh] w-[100vw] border-2">
      <LogoMobile />
    </div>
  )
}

export default TopbarMobile
