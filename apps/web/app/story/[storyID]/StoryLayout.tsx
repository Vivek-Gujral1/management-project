"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { useQuery } from '@tanstack/react-query'
import { getStory } from '../../../constants/StoryQueryFN'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { inStory } from '../../../store/story/StorySlice'

interface items {
    name:string
    slug:string
}

function StoryLayout({children} : {children : React.ReactNode}) {

    const dispatch = useDispatch()
    const storyID = useSelector((state : RootState)=> state.storyID.storyID )
    if (!storyID) {
        return <div>Soemthing went wrong</div>
    }

 
    const navitems :items[]= [
        {
            name:"General",
            slug:`/story/${storyID}`
        },
        {
            name:"Tasks",
            slug:`/story/${storyID}/tasks`
        },
        {
            name:"Chat",
            slug:`/message/stories/${storyID}`
        } ,
        // {
        //     name : "Team Members" ,
        //     slug : `/story/${storyID}/members` 
        // }

    ]

    const {data : FetchStory , isLoading} = useQuery({
        queryKey : ["story"] ,
        queryFn : async () => await getStory(storyID) ,
       
      })

      if (isLoading) {
        return <h1>Loading</h1>
      }
  
      if (!FetchStory) {
        return <div> Story nahi hai</div>
      }else {
       dispatch(inStory(FetchStory)) 
      }


    const org = FetchStory.org[0]
  return (
    <section className='h-[520px]  flex flex-col  gap-5'>
 
     <div className=' h-1/6 w-full border border-white flex flex-row gap-7 items-center justify-center '>
      {navitems.map((item)=>(
       <Link className=' text-xl text-white' href={item.slug} >{item.name}</Link>
      ))}
     </div>

    <div className='border h-full w-full border-black '>
      {children}
    </div>

    {/* <div className=' flex flex-col h-full w-1/4 border border-black'>
      <div className=' h-1/3 w-full border  border-b-black'>
        <img className=' h-5/6 w-full' src={org?.avatar ?  org.avatar : ""} alt="" />
       <div className=' flex flex-row justify-center items-center'>
       <h1 className=' mt-1'>{org?.name}</h1>
       </div>
      </div>

      <div className=' mt-4 flex flex-col gap-4'>{navitems.map((item)=>(
        <Link href={item.slug} className=' pl-2 cursor-pointer  '>{item.name}</Link>
      ))}</div>
    </div> */}

  </section>
  )
}

export default StoryLayout