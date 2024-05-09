"use client"
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React from 'react'
import { getNotifications } from '../../constants/Notifications'
import { useSocket } from '../custom-Hooks/SocketProvider'
import NotificationCard from '../../Components/AcceptNotificationCard'
import Notification from '../../Components/Notification'

function page() {
  const {notifications} = useSocket()
    
    const {data : backendNotification, isLoading} = useQuery({
        queryKey : ["notifications"] ,
        queryFn : async ()=> await getNotifications()
    })
    if (isLoading) {
        return <div>Notifications Loading</div>
    }
    if (!backendNotification) {
        return <div>error while fetching notifications</div>
    }
    console.log(backendNotification);
    
   
  return (
    <main className=' flex flex-col-reverse'>
    <div className=' flex flex-col-reverse'>
        {backendNotification.status ? 
          backendNotification.notifications.map((notification)=>(
           <Notification Notification={notification} />
          ))
        : <div>There is not any notifications</div> }
    </div>
    <div className=' flex flex-col-reverse'>
      {notifications.map((notification)=>(
        <Notification Notification={notification} />
      ))}
    </div>
    </main>
    
  )
}

export default page