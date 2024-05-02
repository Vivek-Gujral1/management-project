import React from 'react'
import { HomePageTask } from '../constants/HomePageQuery'
import { ITask } from '../app/custom-Hooks/SocketProvider'

function Task({Task} : {Task : ITask }) {

   return (
   <div className=' h-[200px] w-full border border-white flex flex-col gap-4'>
     <div className='  h-1/5 border border-white flex flex-row items-center justify-center'>
       <h1 className=' text-white text-lg'>Given To {Task.employee.name}</h1>
     </div>

     <div className=' h-1/2 w-full'>
       <p>{Task.title}</p>
     </div>

     <div className=' h-1/5 border border-white flex flex-row items-center justify-center'>
       <h2 className=' mb-2 text-white text-lg'>Given By {Task.Manager.name}</h2>
     </div>
   </div>  
)
}

export default Task