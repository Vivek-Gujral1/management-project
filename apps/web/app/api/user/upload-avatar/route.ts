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
    const avatarPhoto : File | null = filesData.get("avatar") as unknown as File

  if (avatarPhoto === null) {
     const updatedUserAvatar = await prisma.user.update({
        where : {
            id : user.id
        } ,
        data :{
            avatar : null
        }
     })

     return NextResponse.json({
        messsage : "user avatar updated successfully" ,
        userAvatar : null
     })
  }

  
  const  avatar = await TakeAndUpload(avatarPhoto)
  if (!avatar) {
    throw new ApiError(500 , "error while uploading image")
  }

  const updatedUserAvatar = await prisma.user.update({
    where : {
        id : user.id 
    } ,
    data : {
        avatar : avatar.url
    }
  })

  // update session 
  Sessionuser.avatar = avatar.url

  return NextResponse.json({
    message  : "org updated successfully" ,
    userAvatar     : updatedUserAvatar.avatar
  })
  
}