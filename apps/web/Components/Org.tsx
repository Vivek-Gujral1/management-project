import React from 'react'
import { userOrgs } from '../constants/UserQueryFn'
import { Avatar , AvatarImage , AvatarFallback } from '../@/components/ui/avatar'


function Org({org} : {org : userOrgs}) {
  return (
   <main className=' w-full h-56 border border-white flex flex-col gap-3'>
      <div className='h-1/5  flex flex-row ml-3 gap-4 items-center'>
         <Avatar>
            <AvatarImage src={org.avatar ?  org.avatar : ""} />
            <AvatarFallback className=' text-white'>CN</AvatarFallback>
         </Avatar>
         <h2 className=' text-white font-bold'>{org.name}</h2>
      </div>

     <div className=' h-1/2 border border-white'>
        <p>{org.headline}</p>
        <p className=' text-slate-400'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis quo sint repellat dolore recusandae nulla maxime tempora rem dolores animi, quos illum nihil molestias libero facere beatae molestiae eius illo.</p>
        </div> 
   </main>
  )
}

export default Org