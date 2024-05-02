import { NextRequest } from "next/server"
import { ApiError } from "../../../../utility/ApiError"
import { TakeAndUpload } from "../../../TakeImageAndUplad"
import prisma from "../../../../constants/prisma"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function POST(req : NextRequest) {

   

    const session = await getServerSession(authOptions)
    if (!session) {
        throw new ApiError(400 , "session not found")
    }
    const Sessionuser = session.user
     const user = await prisma.user.findFirst({
        where : {
            id : Sessionuser.id
        }
     })

     if (!user) {
        throw new ApiError(404 , "cannot find org by given Id")
     }

    const filesData = await req.formData()
    const coverImage : File | null = filesData.get("coverImage") as unknown as File

  if (coverImage === null) {
       await prisma.user.update({
        where : {
            id : user.id
        } ,
        data :{
            coverImage : null
        }
     })

     return NextResponse.json({
        messsage : "user avatar updated successfully" ,
        userCoverImage : null
     })
  }

  
  const  Cloudinary_CoverImage = await TakeAndUpload(coverImage)
  if (!Cloudinary_CoverImage) {
    throw new ApiError(500 , "error while uploading image")
  }

  const updatedUserCoverImage = await prisma.user.update({
    where : {
        id : user.id 
    } ,
    data : {
        coverImage : Cloudinary_CoverImage.url
    }
  })

  

  return NextResponse.json({
    message  : "org updated successfully" ,
    userCoverImage     : updatedUserCoverImage.coverImage
  })
  
}