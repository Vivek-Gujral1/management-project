"use client"
import React from 'react'
import { useSocket } from '../../../custom-Hooks/SocketProvider'
import { ITask } from '../../../custom-Hooks/SocketProvider'
import { button } from '@nextui-org/react'

function page() {
  const {sendTask} = useSocket()
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
    const res  =  await sendTask("65f034890a6e1bc1676affd5_search karo" , task)
    console.log(res);
    
  }
  return (
    <button className=' text-white' onClick={taskClick}>Send Task</button>
  )
}

export default page