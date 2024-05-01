import axios from "axios";
import { Idata } from "../app/org/[org]/page";
import { Post } from "@prisma/client";
import { postInterface, postType } from "../app/api/post/get-posts/route";
import { Comments } from "../app/api/post/get-posts/route";
import prisma from "./prisma";


interface ReturnPostTYpe {
    post : postInterface ,
    message : string ,
   
}

interface IupdateCoverImage {
    message : string ,
    org : {
        id : string ,
        coverImage : string
    } ,
    success : boolean
}

export interface UploadedImageData {
    post : Post
}

interface getPostReturnType {
    message : string ,
    posts : Array<postInterface>
}

interface tooglelike {
    message : string
    isLiked : boolean
}

interface checkIsLiked {
    isLiked : boolean
}

export async function updateCoverImage(orgID : string , file : File ) {
    const formData = new FormData
    formData.append('coverImage' , file)
    const {data} : {data : IupdateCoverImage} = await axios.post(`/api/org/update-cover-image?orgID=${orgID}` , formData , {
        headers : {
            "Content-Type" : "multipart/form-data"
        }
    })
    return data
}

export  const uploadImage = async (file: File): Promise<UploadedImageData> => {
    const formData = new FormData();
    formData.append('coverImage', file);
  
   
      const response = await axios.post('/api/upload-cover-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data.post;
     
  };

 export const getPosts = async() =>{
    const {data} : {data : getPostReturnType} = await axios.get("/api/post/get-posts")
    return data
 } 

 export const getPost = async(postID : string)=>{
    const {data} : {data : ReturnPostTYpe }  = await axios.get(`/api/post/get-post?postID=${postID}`)
    console.log( "getPost",data);
    
     return data.post
 }

 export const toggleLike = async(postID : string) => {
    const {data} : {data : tooglelike} = await axios.post(`/api/like/toggle-post-like?postID=${postID}`)
    if (!data) {
        return null
    }
    return data.isLiked
 }

 export const checkIsLiked  = async (postID : string) => {
    const {data} : {data  : checkIsLiked} = await axios.get(`/api/like/check-isLike?postID=${postID}`)
    console.log("check is Liked Data" , data);
    
    return data
 }