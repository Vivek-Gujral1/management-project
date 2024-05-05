"use client"
import React from 'react'
import { searchedItems } from '../constants/SearchQueryFn';
import { INotification, useSocket } from '../app/custom-Hooks/SocketProvider';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

function AddEmployee({user} : {user : searchedItems}) {
  const {sendNotifications} = useSocket()
  const userData = useSelector((state : RootState)=> state.auth.userData)
  if (!userData) {
    return <div>Please Login</div>
  }

  const AddEmployeeNotification : INotification = {
   sender : {
    avatar : userData?.avatar ,
    id     : userData.id ,
    name   : userData.name
   } ,
   content : `${userData.name}  want's you to be added to his organization.    `,
   reciever : {
     id : user.id ,
     avatar : user.avatar ,
     name : user.name
   }
  } 

  const sendNotification = async () => {
      await sendNotifications(`${user.id}_${user.name}` , AddEmployeeNotification)
  }
    return (
        <div className="bg-white shadow-md rounded-md p-4 flex items-center mt-4">
          <img className="w-16 h-16 rounded-full mr-4" src={user.avatar ? user.avatar : ""} alt="User Avatar" />
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
        
            <button onClick={async()=> await sendNotification() } className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md" >
              Add Employee
            </button>
          </div>
        </div>
      );
}

export default AddEmployee