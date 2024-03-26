import React, { useEffect, useState } from 'react'
import TopbarMobile from './TopbarMobile'
import { useSearchParams } from 'next/navigation'

const Homepage = () => {
  return (
  <div className="flex-col h-[100vh]">
    {/* <h1> Absurdly home... </h1>
    <h1> Absurdly not home... </h1> */}
    {/* <TopbarPc /> */}
    <TopbarMobile />
  </div>
  )
}

export default Homepage
