"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'
import { useQuery } from '@tanstack/react-query'
import { getComments } from '../../../../constants/CommentsQueryFN'
import { Avatar } from '@mui/material'
import AddComment from '../AddComment'

function CoomentsPage() {
    // const postId = useSelector((state : RootState)=> state.post.postID)
    // if (!postId) {
    //   return <div>Something went wrong</div>
    // }

    const postID = "661926ac248f37965d86a391"

    const {data : comments  , isLoading : commentsLoading} = useQuery({
        queryKey : ["post-comments"] ,
        queryFn : async() => await getComments(postID) 
      })

      if (commentsLoading) {
        return <div>Comments Loading</div>
      }
      console.log(comments);
      
      if(!comments) {
        return <div>Something went wrong no comments</div>
      }
  return (
    <>
    <div className=' h-3/4 border overflow-auto'>
    {
     comments.comments ?
     comments.comments.map((comment)=>(
       <div className="h-13  flex flex-row gap-4 items-center mt-3" key={comment.id}>
       <div className=" items-center" >
         <Avatar
           src={comment.author.avatar ? comment.author.avatar : ""}
         ></Avatar>
       </div>
       <div className=" flex flex-col rounded-full bg-slate-200  w-full ">
         <div className=" p-4 ">
           <p className=" text-lg">{comment.author.name}</p>
           <p className=" text-base">{comment.content}</p>
         </div>
       </div>
     </div>
     ))
      : 
     <div>
       Being First to comment on this post
     </div>
    }
   </div>
       <AddComment />
   </>
  )
}

export default CoomentsPage