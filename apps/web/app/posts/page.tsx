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
    <main className=" flex flex-col gap-4">
      <Button onClick={()=> router.push("/posts/create-post")} className=' bg-white'> Create Post </Button>
    {data.posts.map((post)=> <Post  postData={post} key={post.post.id} ></Post>)}
    </main>
  )
}

export default page