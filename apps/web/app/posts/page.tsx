"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../../constants/PostQueryFN'
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { postType } from '../api/post/get-posts/route'
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { inPost } from '../../store/postSlice/postslice';
import Post from '../../Components/Post';
import { Button } from '../../@/components/ui/button';

function page() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const dispatch : AppDispatch = useDispatch()
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

  const pushToPost = async(post : postType) =>{
    await queryClient.invalidateQueries({queryKey : ["post"]})
    await queryClient.invalidateQueries({queryKey : ["post-comments"] , exact : true})
    dispatch(inPost(post.id))
    router.push(`/posts/${post.id}`)
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