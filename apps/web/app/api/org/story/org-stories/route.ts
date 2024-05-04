
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "../../../../../utility/ApiError";
import prisma from "../../../../../constants/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function GET(req : NextRequest) {
   
    const session = await getServerSession(authOptions)
    if (!session) {
        throw new ApiError(400 , "user must login to get Stories")
    }
     const user = session.user
   const stories = await prisma.story.findMany({
    where : {
        OR : [
            {
                managerId : {
                    equals : user.id
                }
            } ,
           {
            employees : {
                every : {
                    id : user.id
                }
            }
           }
        ]
    } ,
    select : {
        socketRoomName : true ,
        id : true ,
        name : true ,
        manager : {
            select : {
                name : true ,
                avatar : true
            }
        } ,
        bio : true
    }
   })


if (!stories) {
    return NextResponse.json({
        message : "no stories"
    })
}
console.log( "stories",stories);



    return NextResponse.json({
        message : "Stories fetched" ,
        stories : stories
    })
    

}