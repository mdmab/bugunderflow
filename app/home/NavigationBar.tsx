import React from 'react'
import NavigationButton from './NavigationButton'

const NavigationBar = () => {
  return (
    <div className='flex-col align-center h-[85vh] w-[20vw] border-r-2 border-grey'>
      <NavigationButton label="Home" isSelected='yes' />
      <NavigationButton label="Community" isSelected='no' />
      <NavigationButton label="Find Jobs" isSelected='no' />
      <NavigationButton label="Profile" isSelected='no' />
    </div>
  )
}

export default NavigationBar
