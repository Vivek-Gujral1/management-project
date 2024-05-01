"use client"
import React from 'react'
import { StoriesType } from '../constants/StoryQueryFN'

function Story({story} : {story : StoriesType}) {
  return (
    <div className=' h-[250px] w-full border border-white flex flex-col gap-3'>
     <div className=' h-1/6 flex flex-row gap-4 justify-center items-center'>
        <h2 className=' text-2xl text-white '>{story.name}</h2>
     </div>
    </div>
  )
}

export default Story