

// import React from 'react'

// function Profile() {
//   return (
//     <div className=' h-[500px] w-full border border-white'>
//        <div className=' h-1/3 w-full border border-white   '>
    
//          <div className=' w-1/3 h-1/2  mt-16 border border-white rounded-full ' > </div>
//        </div>
//     </div>
//   )
// }

// export default Profile
"use client"
import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import React from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../constants/UserQueryFn';
import Post from './Post';
import { Button } from '../@/components/ui/button';
import Org from './Org';


const ProfilePage = ({userID} : {userID : string}) => {
  const router = useRouter()
    
    console.log("userID" , userID);
    

    const {data  , isLoading} = useQuery({
      queryKey : ["profile/user"],
      queryFn : async() => await getUser(userID)
    })
    if (isLoading) {
      return <div className=' text-white'>Loading</div>
    }
    if (!data) {
     return <div className=' text-white'>Something Went Wrong</div>
    }

    const onAvatarUpload = () => {
      router.push(`/Profile/upload-avatar/${data.user.id}`)
    } 
    
    const onCoverImageUpload = () => {
      router.push(`/Profile/upload-cover-image`)
    }

    
    

    return (
      <div className="w-full mx-auto   rounded-xl shadow-md overflow-hidden">
      <div className="bg-gray-200 rounded-t-lg overflow-hidden">
        {data.user.coverImage ? (
          <img src={data.user.coverImage} alt="Cover" className="w-full h-64 object-cover" />
        ) : (
          <div className="flex justify-center items-center h-64">
            <button
              className="flex items-center justify-center bg-gray-300 rounded-lg p-4"
              onClick={onCoverImageUpload}
            >
              <AiOutlineUpload className="w-6 h-6 mr-2" />
              Upload Cover Image
            </button>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center">
          {data.user.avatar ? (
            <img src={data.user.avatar} alt="Avatar" className="w-20 h-20 rounded-full" />
          ) : (
            <div className="w-20 h-20 bg-gray-300 rounded-full flex justify-center items-center">
              <button className="text-gray-600" onClick={onAvatarUpload}>
                <AiOutlineUpload className="w-8 h-8" />
              </button>
            </div>
          )}
          <div className="ml-4">
            <h2 className="text-2xl text-white font-semibold">{data.user.name}</h2>
            <p className="text-gray-400">{data.user.email}</p>
          </div>
        </div>
        <p className="text-lg text-gray-200 mt-4 ">shfikahfgkhgsfh</p>
       
      </div>

      <div className=' flex flex-col gap-3 '>
       {data.userOrgs?.map((org)=>(
        <Org org={org} />
       ))}
       <Button className=' bg-blue-500 lg:w-1/6'>Show More</Button>
      </div>

      <div className=' lg:grid lg:grid-cols-2 lg:gap-3 flex flex-col gap-3 mt-5'>
        
        {data.posts?.map((post)=>(
          <Post postData={post} ></Post>
        ))}
          <Button className=' bg-blue-500 lg:w-1/3 '>Show More</Button>
      </div>

      
    </div>
    );
};

export default ProfilePage;
