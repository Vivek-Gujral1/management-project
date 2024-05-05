"use client"
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React from 'react'
import { getNotifications } from '../../constants/Notifications'
import { useSocket } from '../custom-Hooks/SocketProvider'
import NotificationCard from '../../Components/AcceptNotificationCard'

function page() {
  const {notifications} = useSocket()
    
    const {data , isLoading} = useQuery({
        queryKey : ["notifications"] ,
        queryFn : async ()=> await getNotifications()
    })
    if (isLoading) {
        return <div>Notifications Loading</div>
    }
    if (!data) {
        return <div>error while fetching notifications</div>
    }
    console.log(data);
    
  return (
    <main>
    <div>
        {data.status ? 
          data.notifications.map((notification)=>(
            <h1>{notification.content}</h1>
          ))
        : <div>There is not any notifications</div> }
    </div>
    <div>
      {notifications.map((notification)=>(
        <NotificationCard Notification={notification} />
      ))}
    </div>
    </main>
  )
}

export default page