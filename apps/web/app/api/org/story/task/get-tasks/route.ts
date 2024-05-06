import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "../../../../../../utility/ApiError";
import prisma from "../../../../../../constants/prisma";


export async function GET(req : NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const storyID = searchParams.get("storyID")

    if (!storyID) {
        throw new ApiError(400 , "cannot get storyID by searchParams")
    }
    if (storyID.trim() === "") {
        throw new ApiError(400  , "storyID is empty")
    }

    const story  =  await prisma.story.findFirst({
        where : {
            id : storyID
        }
    })

    if (!story) {
        throw new ApiError(400 , "cannot found Story by given ID")
    }

    const tasks = await prisma.task.findMany({
        where : {
            storyID : story.id
        } ,
        select : {
            content : true ,
            title : true ,
            reciver : {
                select : {
                    name : true ,
                    avatar : true ,
                    email : true ,
                    id : true
                }
            } ,
            sender : {
                select : {
                    avatar : true  ,
                    name : true ,
                    email : true ,
                    id : true
                }
            }
        }
    })

    if (!tasks) {
        return NextResponse.json({
            message : "No Tasks available" ,
            tasks : null
        })
    }

    return NextResponse.json({
        message : "story tasks fetched" ,
        tasks : tasks
    })
}