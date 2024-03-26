import React, { useEffect, useState } from 'react'
import TopbarPc from './TopbarPc'
import Threads from './Threads'
import Sidebar from './Sidebar'

const Homepage = () => {
  return (
  <div className="flex-col h-[100vh]">
    {/* <h1> Absurdly home... </h1>
    <h1> Absurdly not home... </h1> */}
    {/* <TopbarPc /> */}
    <TopbarPc />
    <div className='flex'>
      <Threads />
      <Sidebar />
    </div>
  </div>
  )
}

export default Homepage
