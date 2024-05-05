"use client"
import React , {useState} from 'react';
import { INotification, useSocket } from '../app/custom-Hooks/SocketProvider';

const NotificationCard = ({ Notification } : {Notification : INotification}) => {
    const {sendNotifications} = useSocket()
    const [isAccept , setIsAccept] = useState(false)
    const AcceptNotification : INotification = {
        content : `${Notification.reciever.name} just Acepted your Request` ,
        sender  : Notification.reciever ,
         reciever : Notification.sender
    }
    const onAccept = async() => {
       const res  =  await sendNotifications(`${Notification.sender.id}_${Notification.sender.name}`  ,  AcceptNotification)
       setIsAccept(res)
    }
  return (
    <div className="bg-white shadow-md rounded-md p-4 lg:flex lg:flex-row lg:gap-5 lg:items-center lg:h-14 lg:w-1/2">
      <p className="text-lg text-gray-800">{Notification.content}</p>
      <button
        onClick={onAccept}
        className=" py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        {isAccept ? "Accepted" : "Accept"}
      </button>
    </div>
  );
};

export default NotificationCard;
