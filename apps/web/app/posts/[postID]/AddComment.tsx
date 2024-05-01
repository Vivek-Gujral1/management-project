"use client"
import React from 'react'
import { IoSend } from "react-icons/io5";
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from "react-hook-form"
import { createComment } from '../../../constants/CommentsQueryFN';
import { useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store';

interface FormType {
    content  : string
}

function AddComment() {
    // const postId = useSelector((state : RootState)=> state.post.postID)
    // if (!postId) {
    //   return <div>Something went wrong</div>
    // }
    const postId = "661926ac248f37965d86a391"
    const {register , handleSubmit , reset} = useForm<FormType>()
    const queryClient = useQueryClient()
    const {
        mutate  ,
        isPending , 
        data
    } = useMutation({
        mutationFn : async(data : string) => await createComment(postId , data ) ,
        onSuccess : () => {
       queryClient.invalidateQueries({queryKey : ["post-comments"]})
        }
    })

    if (isPending) {
        return <div>creating comment</div>
    }
    
    console.log("data" , data);
    
    const create : SubmitHandler<FormType> = (comingdata) => {
        console.log("clicked ");
        console.log(comingdata);
        
         mutate(comingdata.content)
         reset()
    }

  return (
    <div className="border h-1/5 border-black flex flex-row items-center gap-6">
        <form onSubmit={handleSubmit(create)} className=' h-full w-full flex flex-row items-center gap-6' >
        <textarea  className="border border-black h-full w-4/5 resize-none pl-2"  placeholder="Add Your Comment Here" {...register("content")} id="" cols={3} rows={1}></textarea>
        <button type='submit' >
         <IoSend className=" cursor-pointer text-2xl"  />
         </button>
        </form>
          </div>
  )
}

export default AddComment