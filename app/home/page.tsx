import React, { useEffect, useState } from 'react'
import TopbarPc from '../home_base/TopbarPc'
import Threads from '../home_base/Threads'
import Sidebar from '../home_base/Sidebar'
import NavigationBar from '../home_base/NavigationBar'
import { NAV_HOME } from '../home_base/constants'

const Homepage = () => {
  return (
  <div className="flex-col h-[100vh]">
    {/* <h1> Absurdly home... </h1>
    <h1> Absurdly not home... </h1> */}
    {/* <TopbarPc /> */}
    <TopbarPc />
    <div className='flex'>
      <NavigationBar mode={NAV_HOME} />
      <Threads />
      <Sidebar />
    </div>
  </div>
  )
}

export default Homepage
