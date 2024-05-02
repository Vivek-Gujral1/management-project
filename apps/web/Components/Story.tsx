"use client"
import React from 'react'
import { StoriesType } from '../constants/StoryQueryFN'
import { Avatar, AvatarImage } from '../@/components/ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { Button } from '../@/components/ui/button'
import { AvatarGroup, Avatar as MaterialAvatar  } from "@mui/material";
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store'
import { storyID } from '../store/storyID/storyIDSlice'
import { useSocket } from '../app/custom-Hooks/SocketProvider'

function Story({story} : {story : StoriesType}) {
   const router = useRouter()
   const dispatch : AppDispatch = useDispatch()
   const {joinRoom} = useSocket()

   const RoomJoin = async() => {
     const res =  await joinRoom(story.socketRoomName)
     return res
   }

   const viewStory = async () => {
    const res =  await RoomJoin()
     if (res) {
      dispatch(storyID(story.id))
      router.push(`/story/${story.id}`)
     }
   }
  return (
    <div className=' h-[300px] w-full border border-white flex flex-col gap-3 bg-slate-200 lg:h-[220px]'>
     <div className=' h-1/6 flex flex-row gap-4  items-center'>
       <div className=' ml-4 mt-4'>
       <Avatar  className=' border border-black flex flex-row justify-center items-center'>
        <AvatarImage   src={story.avatar ? story.avatar: ""}> </AvatarImage>
        <AvatarFallback className=''>CN</AvatarFallback>
       </Avatar>
       </div>
      
        <div className=' flex flex-col '>
        <h2 className=' mt-4 text-2xl  '>{story.name}</h2>
        <p className=' text-slate-600'>org name</p>
        </div>
     </div>

     <div className=' h-3/5  flex flex-col gap-2 w-full '>
      <div className='h-1/5  mt-2'>
       <h3 className=' text-slate-800 ml-4'> Story Managed By <span className='text-xl'>{story.manager.name}</span></h3>
      </div>

      <div className=' h-1/5 w-full ml-4'>
        <p className=' text-slate-600'>This Story is made for real team workers and in this story weh have 1000 plus workers</p>
      </div>

      <div className=' h-1/5 flex flex-row items-center justify-start ml-2 mt-12 lg:mt-2'>
      <AvatarGroup max={3}>
                  <MaterialAvatar src="https://github.com/shadcn.png" />
                  <MaterialAvatar src="https://github.com/shadcn.png" />
                  <MaterialAvatar src="https://github.com/shadcn.png" />
                  <MaterialAvatar src="https://github.com/shadcn.png" />

                </AvatarGroup> 
        <p className=' text-slate-700'>1221 Team Members working...</p>
      </div>
     </div>

     <div className=' h-1/6 flex flex-row  items-center lg:-mt-4'>
      <Button onClick={viewStory} size={'sm'} className='ml-3 bg-blue-500 text-white rounded-full'>view Story</Button>
 
     </div>
    </div>
  )
}

export default Story