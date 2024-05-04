"use client"
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Selectorgtype, selectorgsS } from '../constants/selectorgquery'
import { useRouter } from 'next/navigation'

function SeletcOrg({org} : {org : Selectorgtype}) {
    const router = useRouter()
    const pushToOrg = (orgId:String)=>{
        router.push(`/story/create-story/${orgId}`)


    }
   
  return (
    <div onClick={async()=>{pushToOrg(org.id)}} className=" cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden">
    <div className="p-4">
      <div className="flex items-center">
        <div className="h-12 w-12 mr-4">
          <img src={org.avatar? org.avatar:""} alt={`${name} Avatar`} width={48} height={48} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{org.name}</h2>
          
          <p className="text-gray-600">{org.headline}</p>
        </div>
      </div>
    </div>
  </div>
   
  )
}

export default SeletcOrg