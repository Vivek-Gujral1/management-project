"use client"
import React  from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPost } from '../../../constants/PostQueryFN'

import Post from '../../../Components/Post'

interface parmas {
  postID  : string
}

function page({params} : {params : parmas}) {

  

  const {data : postData , isLoading} = useQuery({
    queryKey : ["post"] ,
    queryFn : async() => await getPost(params.postID)
  })

  console.log(postData);
  

  if (isLoading) {
    return <div>Post Loading</div>
  }
 
  if (!postData) {
    return <div> Something went wrong</div>
  }

  // const pushToCommnet = ()=>{ 
  //   console.log("clicekf");
    
  //   dispatch(inPost(postData.id))
  //   router.push(`/posts/${postData.id}/comments`)

  // }

  
  
  return (
 

    <main className=' lg:w-full lg:h-[400px] lg:flex lg:flex-row lg:justify-center lg:items-center ' >
     <div className=' lg:w-1/2  lg:flex lg:flex-row lg:justify-center '>
     <Post postData={postData} ></Post>
     </div>
    </main>

  )
}

export default page