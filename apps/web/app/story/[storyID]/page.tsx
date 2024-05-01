"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store/store'
import Link from 'next/link'

import { getStory } from '../../../constants/StoryQueryFN'
import { Story, User } from '@prisma/client'
import { ReduxRootState } from '../../../store/ReduxStore/reduxStore'
import { newEmployee } from '../../../store/task/taskSlice'
import { useRouter } from 'next/navigation'
import { useSocket } from '../../custom-Hooks/SocketProvider'
import { getTasks } from '../../../constants/StoryQueryFN'

interface params {
  storyID : string
}

function page({params} : {params : params}) {
   
  
  
    // const router = useRouter()
       const story = useSelector((state : RootState)=> state.story.story)
      const StoryOrg = story?.org[0]

    // const {} = useQuery({
    //   queryKey : ["tasks"] ,
    //   queryFn : async () => getTasks(story.id)
    // })

   

    
   
    
  return (
  //   <>
  //   <h1>
  //     {FetchStory?.name}
  //   </h1>

   
  //   <h2>story Org Name {FetchStory.org.map((item)=>item.name)}</h2>
  //  <Link href="/story/create-story">Create Story</Link>

  //  <Link href="/story/add-employee" >Add Employee</Link>

  //  <div>
  //   <h1>Story Employees</h1>

  //   {FetchStory.employees.map((item )=>(
  //     <div className=' h-96 w-96 border border-blue-700'>
  //       <h1>Name === {item.name}</h1>
        
  //       {/* <button onClick={()=> task(item)}>Give Task</button>  */}
  //     </div>
  //   ))}
  //  </div>

  //   </>
     <div className=' h-full w-full'>
         <div className=' h-1/6 w-full border border-white'>
          <h1 className=' text-white'>{StoryOrg?.name}</h1>
         </div>
     </div>


  )
}

export default page