'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const NavigationButton = ({ label="", isSelected="" } : { label: string, isSelected: string }) => {
  const [classOption] = useState(isSelected == "yes" ? "selected" : "unselected")
  const router = useRouter()

  return (
    <div className={'flex grow items-center justify-center navigation-button-' + classOption}
    onClick={() => router.push("/home")}>
      {label}
    </div>
  )
}

export default NavigationButton
