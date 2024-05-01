import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";


export async function GET(req : NextRequest) {
    const searchParams  = req.nextUrl.searchParams
    const postID  =  searchParams.get("postID")

    if (!postID) {
        throw new  ApiError(400  , "Post Id is null")
    }

    if (postID.trim() === "") {
        throw new ApiError(400 , "PostID is empty ")
    }

    const post  =  await prisma.post.findFirst({
        where : {
            id : postID
        }
    })

    if (!post) {
        throw new ApiError(400 , "psot not found with postID")
    }

    const comments = await prisma.comment.findMany({
        where : {
            postID : post.id
        } ,
        orderBy : {
            createdAt : "desc"
        } ,
        select : {
            author : {
                select : {
                    name : true ,
                    avatar : true
                }
            } ,
            content : true ,
            createdAt : true ,
            id : true
        }
    })

    if (!comments) {
        return NextResponse.json( {
          message : "There is No comments of this Post",
          comments : null ,
          status : false  
        })
    }else{
        return NextResponse.json({
            message :"Post comments fetched Successfully" ,
            comments : comments ,
            status : true
        })
    }
}