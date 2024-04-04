import React from 'react'
import AddNewThreadButton from './AddNewThreadButton'

const Sidebar = () => {
  return (
    <div className='flex-col h-[85vh] w-[15vw] border-l-2 border-grey'>
      <AddNewThreadButton />
    </div>
  )
}

export default Sidebar
