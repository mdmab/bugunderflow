'use client'

import React, { useState } from 'react'

const NavigationButton = ({ label="", isSelected="" } : { label: string, isSelected: string }) => {
  const [classOption] = useState(isSelected == "yes" ? "selected" : "unselected")

  return (
    <div className={'flex grow items-center justify-center navigation-button-' + classOption}>
      {label}
    </div>
  )
}

export default NavigationButton
