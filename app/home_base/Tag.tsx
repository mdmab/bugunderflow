import React from 'react'

const Tag = ({ word="" } : { word: string }) => {
  return (
    <div className='tag-word'>
      {word}
    </div>
  )
}

export default Tag
