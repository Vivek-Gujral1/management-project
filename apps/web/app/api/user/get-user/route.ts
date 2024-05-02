import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";



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

    return NextResponse.json({
        message :"user fetched Successfully" ,
        user : user
    })
}