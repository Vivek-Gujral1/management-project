"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../../constants/PostQueryFN'
import { useRouter } from 'next/navigation';
import Post from '../../Components/Post';
import { Button } from '../../@/components/ui/button';

function page() {
  const router = useRouter()

  const {data  , isLoading} = useQuery({
    queryKey : ["posts"] ,
    queryFn : async () => await getPosts()
  })

  if (isLoading) {
    return <div>Loading</div>
  }

  if (!data) {
   return <div>No Posts</div>
  }

 

  console.log("data"  , data);
  

  return (
    <main className=" flex flex-col gap-4 ">
      <Button onClick={()=> router.push("/posts/create-post")} className=' bg-white lg:w-1/3 lg:text-xl'> Create Post </Button>
    {/* {data.posts.map((post)=> <Post  postData={post} key={post.post.id} ></Post>)} */}

    <div className=" flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-5">
        {data?.posts.map((post) => <Post postData={post}></Post>)}
      </div>
    </main>
  )
}

export default page