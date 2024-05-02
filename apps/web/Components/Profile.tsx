

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


const ProfilePage = () => {
  const router = useRouter()
    const session  = useSession()
    if (!session  ) {
        return <div>Please Login</div>
    }
    const user = session.data?.user
    if (!user) {
        return <div>user nahi hai</div>
    }

    const onAvatarUpload = () => {
      router.push(`/Profile/upload-avatar/${user.id}`)
    } 
    
    const onCoverImageUpload = () => {
      router.push(`/Profile/upload-cover-image`)
    }

    console.log("session user " , user);
    

    return (
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gray-200 rounded-t-lg overflow-hidden">
        {user.coverImage ? (
          <img src={user.coverImage} alt="Cover" className="w-full h-64 object-cover" />
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
          {user.avatar ? (
            <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-full" />
          ) : (
            <div className="w-20 h-20 bg-gray-300 rounded-full flex justify-center items-center">
              <button className="text-gray-600" onClick={onAvatarUpload}>
                <AiOutlineUpload className="w-8 h-8" />
              </button>
            </div>
          )}
          <div className="ml-4">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <p className="text-lg text-gray-700 mt-4">shfikahfgkhgsfh</p>
        <p className="text-gray-600 mt-2">hfrlsgh,rshgkjgnehtlcxmngjdfgl,msfgojf;gjhu</p>
      </div>
    </div>
    );
};

export default ProfilePage;
