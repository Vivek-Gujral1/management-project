import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "../../../../../utility/ApiError";
import prisma from "../../../../../constants/prisma";

export async function GET(req:NextRequest) {


    const searchParams  = req.nextUrl.searchParams
    const storyId = searchParams.get("StoryID")
    if (!storyId) {
        throw new ApiError(400,"storyId not found")
        
    }

    const story = await prisma.story.findFirst({
        where:{
            id:storyId
        },
        select:{
            employees:{
                select:{
                    name:true,
                    avatar:true,
                    id:true,
                     email:true
                }
            }
        }
    })
    if (!story) {
        throw new ApiError(500,"story not found")
        
    }

    return NextResponse.json({
        message:"Employesas of stories get",
        employess:story.employees
    })


    
}