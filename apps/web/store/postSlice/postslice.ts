"use client"


import { createSlice,PayloadAction } from "@reduxjs/toolkit"
import { boolean } from "zod"

export interface initialStateTYpe {
 status : boolean 
 postID : string | null
}




const initialState : initialStateTYpe ={
   postID : null ,
   status : false
}

const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        inPost:(state,action:PayloadAction<string>)=>{
            state.status=true,
            state.postID=action.payload
        },
        notInPost:(state,action)=>{
            state.status=false,
            state.postID = null
        }
    }
})
export const {inPost,notInPost}=postSlice.actions
export default postSlice.reducer