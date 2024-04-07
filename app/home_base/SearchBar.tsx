'use client'

import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import { hardPush } from './util'

let searchString = ""

function onClickingSearch(searchStr: string) {

  fetch("http://localhost:3000/api/search?string=" + searchStr.split(" ").filter(word => word != "")
                                                                         .join("+"), {
    method: "GET",
    mode: "cors"
  }).then(res => res.json()).then(res => {
    console.log(res)
  })
}

const SearchBar = () => {
  const router = useRouter()

  return (
    <div className='flex space-x-2'>
      <input type="text" className='h-[5vh] w-[40vw] search-bar' onChange={event => {
        searchString = event.target.value
      }} />
      <div className='flex h-[5vh] p-1 items-center search-button'
      // onClick={() => onClickingSearch(searchString)}>
      onClick={() => hardPush('/search?string=' + searchString.split(" ").filter(word => word != "")
                                                                         .join("+"))
      }>
        <img src="/assets/icons/search.svg" height={25} width={25} />
      </div>
    </div>
  )
}

export default SearchBar
