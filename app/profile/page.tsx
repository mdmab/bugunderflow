'use client'

import { useAuth, useUser } from '@clerk/nextjs'
import React from 'react'
import TopbarPc from '../home_base/TopbarPc'
import NavigationBar from '../home_base/NavigationBar'
import { NAV_PROFILE } from '../home_base/constants'
import Image from 'next/image'
import Info from './Info'

const page = () => {
  const user = useUser()
  const auth = useAuth()

  return (
    <div className='flex-col grow w-[100vw]'>
      <TopbarPc />
      <div className='flex grow'>
        <NavigationBar mode={NAV_PROFILE} />
        <div style={{ "margin" : "1em 10em" }}
        className='flex grow items-center justify-left space-x-2'>
          {
            auth.isSignedIn && auth.isLoaded && user.user?.fullName ?
            <img src={user.user.imageUrl} alt={user.user?.fullName}
            style={{
              // "position" : "fixed",
              "objectFit" : "contain",
              // "overflow" : "hidden",
              "height": "50vh",
              "width" : "50vh",
              "borderRadius" : "0.5em"
            }}/> :
            <>Wait</>
          }
          <div className='flex-col grow'>
            {
              auth.isSignedIn && auth.isLoaded && user.user?.fullName ?
              <Info title="Name" value={user.user.fullName} />
              :
              <>Wait</>
            }
            {
              auth.isSignedIn && auth.isLoaded && user.user?.fullName ?
              <Info title="Email" value={user.user.primaryEmailAddress?.toString()} />
              :
              <>Wait</>
            }
            {
              auth.isSignedIn && auth.isLoaded && user.user?.fullName ?
              <Info title="Joined" value={user.user.createdAt?.toDateString()} />
              :
              <>Wait</>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
