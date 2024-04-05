import React from 'react'

const SearchBar = () => {
  return (
    <div className='flex space-x-2'>
      <input type="text" className='h-[5vh] w-[40vw] search-bar' />
      <div className='flex h-[5vh] p-1 items-center search-button'>
        <img src="/assets/icons/search.svg" height={25} width={25} />
      </div>
    </div>
  )
}

export default SearchBar
