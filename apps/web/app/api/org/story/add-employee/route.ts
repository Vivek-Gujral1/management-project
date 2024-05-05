import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "../../../../../utility/ApiError";
import prisma from "../../../../../constants/prisma";

export  async function POST(req : NextRequest) {
  const searchParams = req.nextUrl.searchParams
   const orgId = searchParams.get("orgID")

   if (!orgId) {
     throw new ApiError(400 , "cannot get orgID by searchParams")
   }
   if (orgId.trim()==="") {
    throw new ApiError(400 , "orgID is empty")
   }

   const org =  await prisma.org.findFirst({
    where : {
        id : orgId
    } ,
    include : {
        story : true ,
        employees : true
    }
   })
   if(!org){
    throw new ApiError(400 , "cannot find org")
   }

   const orgStories = org.story
   const orgEmployess = org.employees
   const storyID = searchParams.get("storyID")

   if (!storyID) {
    throw new ApiError( 400,"cannot get storyID by searchParams")
   }

   if (storyID.trim()==="") {
    throw new ApiError(400 , "storyId is empty")
   }
  
   const story =  orgStories.find((story)=>story.id === storyID)

     if (!story) {
        throw new ApiError(400 ,  "cannot found Story with given StoryId")
     }

     const TeamMemberID = searchParams.get("TeamMemberID")

     if (!TeamMemberID) {
        throw new ApiError( 400,"cannot get TeamMemberID  by searchParams")
       }
    
       if (TeamMemberID.trim()==="") {
        throw new ApiError(400 , "TeamMemberID is empty")
       }

       const TeamMember = orgEmployess.find((member)=>member.id === TeamMemberID)

       if (!TeamMember) {
         throw new ApiError(400 , "Firstly user can make a Employye of Organisation to add in story as memeber")
       }

       const addMember = await prisma.story.update({
        where : {
            id : story.id
        } ,
        data : {
            employees : {
                connect : {
                    id : TeamMember.id
                }
            }
        }
       })

       return NextResponse.json({
        message : "story member added" ,
        story  : addMember
       })
       

}
   