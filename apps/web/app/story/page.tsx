"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { StoriesType, getStories } from '../../constants/StoryQueryFN'
import { useSocket } from '../custom-Hooks/SocketProvider'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { storyID } from '../../store/storyID/storyIDSlice'
import Story from '../../Components/Story'

function page() {
    const dispatch:AppDispatch = useDispatch()
     const router = useRouter()  
    const {joinRoom} = useSocket()
    const {data , isLoading} = useQuery({
        queryKey : ["stories"],
        queryFn : async() => await getStories()
    })
    const RoomJoin = async (roomName: string) => {
        const res = await joinRoom(roomName);
        console.log(`join Room Response ${res} `);
        return res;
      };
    if (isLoading) {
        return <div>Loading</div>
    }

    const pushToStory = async (story : StoriesType) => {
         const res = await RoomJoin(story.socketRoomName)
         if(res){
           dispatch(storyID(story.id))
            router.push(`/story/${story.id}`)
         }
    }
  return (
    // <div>
    //     {
    //         data?.map((story)=>(
    //             <div>
    //                 <h1  onClick={() => pushToStory(story) } className=' text-white cursor-pointer'>{story.name}</h1>
    //             </div>
    //         ))
    //     }
    // </div>

    <main className=' flex flex-col gap-5'>
      {data?.map((story)=>(
        <Story story={story} />
      ))}
    </main>

  )
}

export default page