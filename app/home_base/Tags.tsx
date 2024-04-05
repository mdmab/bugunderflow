import React from 'react'
import Tag from './Tag'

const Tags = ({ words=[] } : { words: string[] }) => {
  return (
    <div className='flex grow space-x-4'>
      {/* {
        words.forEach((word) => {
          <Tag word={word} />
        })
      } */}
      {/* <Tag word={"" + words.length} /> */}
      {
        words.map(word => <Tag word={word} />)
      }
    </div>
  )
}

export default Tags
