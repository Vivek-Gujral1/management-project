import React from 'react'
import CreateStoryCard from '../../../../Components/CreateStoryCard'


interface params {
    orgId:string
}

function page({params} : {params : params}) {


  return (
    <div><CreateStoryCard  orgID={params.orgId}/></div>
  )
}

export default page