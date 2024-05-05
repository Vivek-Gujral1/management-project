"use client"
import React from 'react'
import { getStoryMembers } from '../../../constants/StoryQueryFN'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import Card from '../../../Components/Card'
import SendTaskEmployeesCard from '../../../Components/SendTaskEmployeesCard'



function page() {
    const story = useSelector((state:RootState)=>state.story.story)
    console.log(story);
    
  return (
    <main>
        {story?.employees.map((user)=>(
            <SendTaskEmployeesCard user={user}></SendTaskEmployeesCard>
        ))}
    </main>
  )
}

export default page