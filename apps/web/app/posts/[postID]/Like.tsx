"use client"

import { useQuery } from '@tanstack/react-query'
import React  , {useState} from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { checkIsLiked } from '../../../constants/PostQueryFN'
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { toggleLike } from '../../../constants/PostQueryFN'
import { set } from 'zod'


function Like() {
  const postId = useSelector((state : RootState)=> state.post.postID)
  console.log(postId);
  
  if (!postId) {
    return <div>Something went wrong</div>
  }
  const [liked  , setIsLiked] = useState<boolean >(false)
  const {data , isLoading} = useQuery({
    queryKey : ["isLike"] ,
    queryFn : async() => checkIsLiked(postId)
  })
  if (isLoading) {
    return <div>wait</div>
  }
  if (!data) {
    return <div>data nahi hai</div>
  }

  
 
 
  const createLike = async () => {
    const res =  await toggleLike(postId)
    if (res === null) {
      return
    }
    setIsLiked(res)
  }
 
  return (
    <p onClick={createLike} className='cursor-pointer text-xl'>{liked ? <AiFillLike /> : <AiOutlineLike />}</p>
  )
}

export default Like