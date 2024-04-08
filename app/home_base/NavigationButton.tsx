'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const NavigationButton = ({ label="", isSelected="", onClick }
  : 
{ label: string, isSelected: string, onClick: () => any }) => {
  const [classOption] = useState(isSelected == "yes" ? "selected" : "unselected")
  const router = useRouter()

  return (
    <div className={'flex grow items-center justify-center navigation-button-' + classOption}
    onClick={onClick}>
      {label}
    </div>
  )
}

export default NavigationButton
