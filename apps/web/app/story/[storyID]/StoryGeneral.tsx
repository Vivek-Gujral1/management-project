"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

function StoryGeneral() {
  const story = useSelector((state:RootState)=>state.story.story)
  if (!story) {
    return <div>something Went Wrong</div>
    
  }
  // const storymanager = story.manager[0]
  // if (!storymanager) {
  //   return <div>khg,fjhgthg</div>
  // }
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold">{story.name}</h1>
        <div className="flex items-center mt-4">
          <img src=  "https://github.com/shadcn.png" alt="image" className="w-10 h-10 rounded-full mr-2" />
          <p className="text-gray-700">Vivek</p>
        </div>
        <p className="text-gray-600 mt-2">{story.bio}</p>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Employees</h2>
          <ul className="mt-2">
            {story.employees.map((employee, index) => (
              <li key={index} className="text-gray-700">{employee.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StoryGeneral