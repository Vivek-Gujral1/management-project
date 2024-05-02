import React from 'react'
import Profile from '../../../Components/Profile'

interface params {
    id : string
}

function ProfilePage({params} : {params : params}) {
  return (
   <main>
    <Profile userID={params.id} ></Profile>
   </main>
  )
}

export default ProfilePage