import React from 'react'
import TopbarPc from '../home_base/TopbarPc'
import NavigationBar from '../home_base/NavigationBar'
import { NAV_MY_THREADS } from '../home_base/constants'
import MyThreads from './MyThreads'

const page = () => {
  return (
    <div className="flex-col h-[100vh]">
      {/* <h1> Absurdly home... </h1>
      <h1> Absurdly not home... </h1> */}
      {/* <TopbarPc /> */}
      <TopbarPc />
      <div className='flex'>
        <NavigationBar mode={NAV_MY_THREADS} />
        <MyThreads />
      </div>
    </div>
  )
}

export default page
