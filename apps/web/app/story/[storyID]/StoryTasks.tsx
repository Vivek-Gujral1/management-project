"use client"
import React from 'react'
import TaskCard from '../../../Components/TaskCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Button } from '../../../@/components/ui/button';

function StoryTasks() {
  const story = useSelector((state : RootState)=> state.story.story)
  const user  = useSelector((state : RootState)=> state.auth.userData)
  if (!user) {
    return <div>Please Login</div>
  }
  if (!story) {
    return <div>Story nahi hai</div>
  }
  console.log("story" , story);
  
   
  
    
  return (
  
    <main className=' flex flex-col gap-3'>
      {story.manager?.id === user.id ?   <Button size={'lg'} className='bg-green-500 lg:w-1/3 text-xl'> Send Task</Button> : null}
    
        <div>
        <TaskCard />
        </div>
    </main>
  
  )
}

export default StoryTasks