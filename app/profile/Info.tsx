import { useAuth, useUser } from '@clerk/nextjs'
import React from 'react'

const Info = ({ title="", value="" } : { title: string, value: string | undefined }) => {
  return (
    <div className='flex grow space-x-4' style={{"fontFamily": "Gill sans, sans-serif", "fontSize": "1.1em"}}>
      <div className='w-[7vw]'
      style={{"textAlign": "right", "fontWeight": "bold", "fontFamily": "sans-serif"}}>
        {title} :
      </div>
      <div>
        {value == undefined ? "" : value}
      </div>
    </div>
  )
}

export default Info
