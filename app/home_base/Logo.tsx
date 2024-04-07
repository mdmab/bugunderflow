import Image from 'next/image'
import React, { useState } from 'react'
import { hardPush } from './util'

const Logo = () => {
  const [logoPath] = useState("/assets/images/bug_underflow_logo_light_mode.png")
  // const [logoPath] = useState("/assets/images/bug_underflow_logo.png")

  return (
    <div className='flex items-center justify-between w-[20vw] hover:cursor-pointer'
    onClick={() => hardPush('/home')}>
      <Image height={30} width={30} alt="logo-icon" src="/assets/images/site-logo.svg"/>
      <Image height={50} width={248}
             src={logoPath} alt="main-logo"/>
    </div>
  )
}

export default Logo
