import { Accordion, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Image from 'next/image'
import React, { use, useState } from 'react'

const LogoMobile = () => {
  const [logoPath] = useState("/assets/images/bug_underflow_logo_light_mode.png")
  const [assetRootPath] = useState("/assets")
  const [optionIconPath] = useState("/assets/icons/option.svg")
  const [closeIconPath] = useState("/assets/icons/close.svg")

  const [OPTION] = useState(1)
  const [CLOSE] = useState(2)

  const [state, setState] = useState(OPTION)
  // const [logoPath] = useState("/assets/images/bug_underflow_logo.png")

  return (
    <div className='flex items-center w-[100vw]'>
      <Image height={40} width={40}
            src={state === OPTION ? optionIconPath: closeIconPath}
            onClick={() => (state === OPTION ? setState(CLOSE): setState(OPTION))} alt="options" />

      <div className='flex items-center justify-center w-[90vw]'>
        <Image height={30} width={30} alt="logo-icon" src="/assets/images/site-logo.svg"/>
        <Image height={50} width={248}
              src={logoPath} alt="main-logo"/>
      </div>
    </div>
  )
}

export default LogoMobile
