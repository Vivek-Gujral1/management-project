import React from 'react';
import { INotification } from '../app/custom-Hooks/SocketProvider';
import { useQuery } from '@tanstack/react-query';


const Notification = ({ Notification } : {Notification : INotification}) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 max-w-sm mx-auto mb-4">
      <p className="text-gray-800">{Notification.content}</p>
    </div>
  );
};

export default Notification;
