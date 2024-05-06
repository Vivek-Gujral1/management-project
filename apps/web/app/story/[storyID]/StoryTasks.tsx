"use client"
import React from 'react'
import TaskCard from '../../../Components/TaskCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Button } from '../../../@/components/ui/button';
import Link from 'next/link';
import { useSocket } from '../../custom-Hooks/SocketProvider';
import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../../../constants/TaskQueryFN';

function StoryTasks() {
  
  const story = useSelector((state : RootState)=> state.story.story)
  const user  = useSelector((state : RootState)=> state.auth.userData)
  const {Tasks} = useSocket() 


  console.log(Tasks);
  
  if (!user) {
    return <div>Please Login</div>
  }
  if (!story) {
    return <div>Story nahi hai</div>
  }
  console.log("story" , story);
  const {data : backendFetchedTasks , isLoading} = useQuery({
    queryKey : ["tasks"] ,
    queryFn  : async () => await getTasks(story?.id)
   })

  if (isLoading) {
    return <h1>Tasks Loading</h1>
  }
  console.log( "backend tasks" , backendFetchedTasks);
  
  
   
  const allTasks = [...(backendFetchedTasks ?? []), ...Tasks];
    
  return (
  
    <main className=' flex flex-col gap-3'>
      {story.manager?.id === user.id ?   <Link href="/task"><Button  size={'lg'} className='bg-green-500 lg:w-1/3 text-xl'> Send Task</Button></Link>  : null}
    
   
        <div className=' flex flex-col gap-3'>
        {allTasks.map((task)=>(
          <TaskCard task={task}/>
        ))}
        </div>
    </main>
  
  )
}

export default StoryTasks