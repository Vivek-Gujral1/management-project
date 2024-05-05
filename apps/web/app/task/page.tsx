// "use client"
// import React from 'react'
// import { useSelector } from 'react-redux'
// import { RootState } from '../../store/store'
// import { useRouter } from 'next/navigation'
// import axios from 'axios'
// import { useForm } from 'react-hook-form'
// import { useSocket } from '../custom-Hooks/SocketProvider'
// import { string } from 'zod'
// import { Task } from '@prisma/client'

// interface respone {
//   message : string 
//   task : Task
// }

// function page() {
//     const employye = useSelector((state : RootState)=> state.task.Employee)
//     const story = useSelector((state : RootState) => state.story.story)
//     const router = useRouter()
//     if (!employye && story) {
//         router.push("/")
//     }
//    const {joinRoom} = useSocket()
//     const RoomJoin = async(roomName : string) =>{
//       const res = await joinRoom(roomName)
//       console.log(`room status ${res} ` );
//       return res
//     }


//     const {register , handleSubmit} = useForm()
//     const give = async(dataa : any) =>{
//       const {data} : {data : respone} = await axios.post(`/api/org/story/task/create-task?reciverID=${employye?.id}&storyID=${story?.id}` , dataa )

//       console.log(data);
//       if (data.task) {
//         if (data.task.TaskSocketRoomName !== null) {
//           const res = await RoomJoin(data.task.TaskSocketRoomName)
//           console.log(`if wala res ${res}`);
          
//         }
        
//       }
      
  

//     }
//   return (
//     <>
//     <div>employee Name {employye?.name}</div>
//     <form onSubmit={handleSubmit(give)}>
//     <input type="text" placeholder='title' {...register("title")} />
//     <input type="text" placeholder='content' {...register("content")} />
//     <button>Give tasks</button>
//     </form>
//     </>
//   )
// }

// export default page

"use client"
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormType {
  taskTitle : string
  taskContent : string
}

function page() {
  const {register, handleSubmit, formState: {errors} , reset} = useForm<FormType>();
  const onSubmit : SubmitHandler<FormType> = (data ) => {
    console.log(data); 
     reset()
  };
  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-gray-100 rounded-md ">
    <h1 className="text-2xl font-bold mb-4">Create a Task</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700">
          Task Title
        </label>
        <input
          type="text"
          id="taskTitle"
          {...register('taskTitle', { required: true })}
          className={`mt-1 p-2 w-full border-gray-300 rounded-md ${errors.taskTitle ? 'border-red-500' : ''}`}
        />
        {errors.taskTitle && <span className="text-red-500 text-sm">Task Title is required</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="taskContent" className="block text-sm font-medium text-gray-700">
          Task Content
        </label>
        <textarea
          id="taskContent"

          {...register('taskContent', { required: true })}
          className={`resize-none mt-1 p-2 w-full border-gray-300 rounded-md ${errors.taskContent ? 'border-red-500' : ''}`}
          rows={4}
        ></textarea>
        {errors.taskContent && <span className="text-red-500 text-sm">Task Content is required</span>}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full "
      >
        Submit Task
      </button>
    </form>
  </div>
  )
}

export default page
