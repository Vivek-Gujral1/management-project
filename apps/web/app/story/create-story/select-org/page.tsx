"use client"
import React from 'react'
import SeletcOrg from '../../../../Components/SeletcOrg'
import { useQuery } from '@tanstack/react-query'
import { selectorgsS } from '../../../../constants/selectorgquery'

function page() {
    const {data,isFetching}= useQuery({
        queryKey:["orgs"],
        queryFn:selectorgsS
    })
    if (isFetching) {
        return <div>Is Fetching...</div>
        
    }
    if (!data?.orgs) {
        return <div>You Have No Orgs To Create Story</div>
        
    }
  return (
    <main className=' flex flex-col gap-4 '>
        <h2 className=' text-white text-2xl ml-80'>Select Organisation to Create Story</h2>
        {data.orgs.map((org)=>(
            <SeletcOrg org={org} />
        ))}
    </main>
  )
}

export default page