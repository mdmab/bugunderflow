import React from 'react'
import AddNewThreadButton from './AddNewThreadButton'
import MostViewedThreads from './MostViewedThreads'
import { ScrollArea } from '@/components/ui/scroll-area'

const Sidebar = () => {
  return (
    <div className='flex-col h-[85vh] w-[15vw] border-l-2 border-grey'>
      <AddNewThreadButton />
      <ScrollArea className='flex-col'>
        <MostViewedThreads />
      </ScrollArea>
    </div>
  )
}

export default Sidebar
