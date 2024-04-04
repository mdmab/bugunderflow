import React from 'react'
import NavigationButton from './NavigationButton'
import { NAV_COMMUNITY, NAV_FIND_JOBS, NAV_HOME, NAV_PROFILE } from './constants'

const NavigationBar = ({ mode=NAV_HOME } : { mode: number }) => {
  return (
    <div className='flex-col align-center h-[85vh] w-[15vw] border-r-2 border-grey'>
      <NavigationButton label="Home" isSelected={mode == NAV_HOME ? "yes" : "no"} />
      <NavigationButton label="Community" isSelected={mode == NAV_COMMUNITY ? "yes" : "no"} />
      <NavigationButton label="Find Jobs" isSelected={mode == NAV_FIND_JOBS ? "yes" : "no"} />
      <NavigationButton label="Profile" isSelected={mode == NAV_PROFILE ? "yes" : "no"} />
    </div>
  )
}

export default NavigationBar
