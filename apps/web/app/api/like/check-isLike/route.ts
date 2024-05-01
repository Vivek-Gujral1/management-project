import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function  GET(req : NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const postID = searchParams.get("postID")

    if (!postID) {
        throw new ApiError(400 , "cannot get postId from searchParams")
    }
    if (postID.trim() === "") {
        throw new ApiError(400 , "postId is empty")
    }

    const post = await prisma.post.findFirst({
        where : {
            id : postID
        }
    })

    if (!post) {
        throw new ApiError(400 , "cannot find post with postId")
    }

    const session = await getServerSession(authOptions)
    if(!session){
        throw new ApiError(400 , "cannot check this without login")
    }
    const user = session.user
    const isLiked = await prisma.like.findFirst({
        where : {
            likedByID : user.id ,
            postID : post.id
        }
    })
    if (!isLiked) {
        return NextResponse.json({
            isLiked : false
        })
    }else {
        return NextResponse.json({
            isLiked : true
        })
    }
}