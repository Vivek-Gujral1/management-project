"use client"
import React from 'react'
import { useSocket } from '../../../custom-Hooks/SocketProvider'
import { ITask } from '../../../custom-Hooks/SocketProvider'
import { button } from '@nextui-org/react'
import Task from '../../../../Components/Task'
import { HomePageTask } from '../../../../constants/HomePageQuery'

function page() {
  const {sendTask , Tasks} = useSocket()
  const task : ITask = {
    content : "ya task hai" ,
    title : "task ka title" ,
    employee : {
      avatar : null ,
       id : "124" ,
       name : "noukar"
    } ,
    Manager : {
      avatar : null ,
      id : "1234" ,
      name : "khadoos"
    }

  }

  const taskClick = async() => {
    const res  =  await sendTask("65f034890a6e1bc1676affd5_org ki story" , task)
    console.log(res);
    
  }
  console.log("tasks" , Tasks);
  
  return (
    <>
    <button className=' text-white' onClick={taskClick}>Send Task</button>
     {
         Tasks.map((task)=>(
          <h1 className=' text-white'>{task.content}</h1>
         ))
     }
     </>
    // <main>
    //   <Task Task={task}></Task>
    // </main>
  )
}

export default page