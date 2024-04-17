'use client'

import React from 'react'
import NavigationButton from './NavigationButton'
import { NAV_COMMUNITY, NAV_FIND_JOBS, NAV_HOME, NAV_MY_THREADS, NAV_PROFILE } from './constants'
import { hardPush } from './util'
import { useRouter } from 'next/navigation'

const NavigationBar = ({ mode=NAV_HOME } : { mode: number }) => {
  const router = useRouter()

  return (
    <div className='flex-col align-center h-[85vh] w-[15vw] border-r-2 border-grey'>
      <NavigationButton label="Home" isSelected={mode == NAV_HOME ? "yes" : "no"}
      onClick={() => router.push("/home")}/>
      {/* <NavigationButton label="Community" isSelected={mode == NAV_COMMUNITY ? "yes" : "no"} />
      <NavigationButton label="Find Jobs" isSelected={mode == NAV_FIND_JOBS ? "yes" : "no"} /> */}

      <NavigationButton label="Profile" isSelected={mode == NAV_PROFILE ? "yes" : "no"}
      onClick={() => router.push("/profile")}/>

      <NavigationButton label="My Threads" isSelected={mode == NAV_MY_THREADS ? "yes" : "no"}
      onClick={() => router.push("/my-threads")}/>
    </div>
  )
}

export default NavigationBar
