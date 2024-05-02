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
  //   <div className='h-full w-full  flex flex-col gap-1'>
 
  //  <div className=' flex flex-row  ml-3  items-center gap-4'>
  //    <Avatar src={postData.postOwner.avatar ? postData.postOwner.avatar : ""}></Avatar>
   
  //     <span className=' text-2xl text-white'>{postData?.postOwner.name}</span>
  //         <span className='  text-white ml-16'>18 April at 22:09</span>
  //     </div>
  
  //   <div className=' h-2/3 w-full border border-red-950 '>

  //       <img src={postData?.photo ? postData.photo : ""} alt="image" className=' h-full w-full' />
  //   </div>
  //   <div className='flex flex-row gap-12 justify-center'>
  //       <p>Like</p>
  //     {/* <p onClick={pushToCommnet}>Comment</p> */}
  //       <Button onClick={pushToCommnet}> Comments</Button>
  //        <p>Share</p>
  //   </div>




  //   </div>
     
    //  <div><div className=' w-2/5 h-full border border-red-950'>
    //     <div className=' h-1/6 border border-black flex flex-row items-center justify-between'>
    //   {/* <div className=' flex flex-row items-center gap-4'>
    //  <Avatar src={postData.postOwner.avatar ? postData.postOwner.avatar : ""}></Avatar>
    //   <span className=' text-2xl'>{postData?.postOwner.name}</span>
    //   </div> */}
    //      {/* <span className=' mr-3'>18 April at 22:09</span> */}
    //     </div>
    //     <div className=' border border-black flex flex-row items-center justify-around'>
    //        <Like/>
    //         <p>Comments</p>
    //         <p>Share</p>
    //     </div>
    //     <div className=' h-3/4 flex flex-col justify-between'>
           
    //        <Comments />
    //        <AddComment /> 
    //     </div>
    // </div>
    // </div>

    <main>
      <Post postData={postData} ></Post>
    </main>

  )
}

export default page