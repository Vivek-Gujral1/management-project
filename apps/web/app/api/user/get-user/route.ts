import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";
import { postInterface, postType } from "../../post/get-posts/route";

export const checkIsLiked = async (postID : string , userID : string) => {
    const isLiked = await prisma.like.findFirst({
     where : {
       postID : postID ,
       likedByID : userID
     }
    })
 
    if (!isLiked) {
     return false
    }
    return true
 }

 const convertPost = async (posts : Array<postType> , index : number , convertedPosts : Array<postInterface> , userID : string) : Promise<Array<postInterface>> => {
    if (index >= posts.length) {
      return convertedPosts
    }
    if (!posts) {
      return convertedPosts
    }
  
    const currentPost = posts[index]
  
    if (currentPost && currentPost.id) {
      const isLiked = await checkIsLiked(currentPost.id , userID)
      const postConvert : postInterface  = {
        isLiked : isLiked ,
        post : currentPost ,
        postLikes : currentPost.likes.length
      }
      convertedPosts = [...convertedPosts , postConvert]
    }
  
    return convertPost(posts , index+1 , convertedPosts , userID)
  }


export async function GET(req : NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const userID = searchParams.get("userID")

    if (!userID) {
        throw new ApiError(400 , "cannot get userID by SearchParams")
    }

    if (userID.trim() === "") {
        throw new ApiError(400 , "userId is empty ")
    }

    const user = await prisma.user.findFirst({
        where : {
            id : userID
        } ,
        select : {
            avatar : true ,
            email : true ,
            name : true ,
            coverImage : true ,
            bio : true ,
            headline : true ,
           id : true
        }
    })

    if (!user) {
        throw new ApiError(400 , "cannot find user")
    }

    const userOrgs = await prisma.org.findMany({
        where : {
            OR : [
                {
                    owner : {
                        some : {
                            id : user.id
                        }
                    }
                } ,
                {
                    employees : {
                        some : {
                            id : user.id
                        }
                    }
                }
            ]
        } ,
        select : {
            name : true ,
            id : true ,
            email : true ,
            avatar : true ,
            headline : true
        } ,
        orderBy : {
            createdAt  : "desc"
        } ,
        take : 2
    }) 


    console.log("userOrgs" , userOrgs);
    
    const posts = await prisma.post.findMany({
        where : {
            postOwnerID : user.id
        } ,
        select :  {
            likes :  {
                select : {
                    likedBy : true ,
                    likedByID : true
                }
            },
            impressions: true,
            createdAt: true,
            title: true,
            photo: true,
            videoFile: true,
            videoDuration: true,
            postOwner: {
                select : {
                    avatar : true ,
                    id : true ,
                    name : true
                }
            },
            id: true
        } ,
        orderBy : {
            createdAt : "desc"
        } ,
        take  : 2

    })

    let convertedPosts : Array<postInterface> = []
  if (posts) {
    convertedPosts = await convertPost(posts , 0 , convertedPosts , user.id)
  }


    return NextResponse.json({
        message :"user fetched Successfully" ,
        user : user ,
        userOrgs : userOrgs ? userOrgs : null ,
        posts : convertedPosts
    })
}