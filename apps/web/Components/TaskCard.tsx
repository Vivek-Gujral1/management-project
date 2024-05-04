"use client"
import React from 'react'


function TaskCard() {
 

    return (
        <div className="bg-white shadow-md rounded-md p-4">
    <h2 className="text-lg font-semibold">Task Title</h2>
    <p className="text-gray-600 mt-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo labore nam magni aut deleniti expedita architecto laboriosam quos. Veniam earum neque doloremque odit, illo eius minima inventore blanditiis hic voluptatibus.</p>
    <div className="flex items-center mt-4">
      <span className="text-gray-700">Task Sender:</span>
      <p className="text-gray-700 ml-2 font-bold">Nitin </p>
    </div>
    <div className="flex items-center mt-2">
      <span className="text-gray-700 ">Task Receiver:</span>
      <p className="text-gray-700 ml-2 font-bold">Vivek</p>
    </div>
  </div>
    )
}

export default TaskCard