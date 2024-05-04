import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new ApiError(400, "user session not found");
    }
    const user = session.user;
 
    
    const orgs = await prisma.org.findMany({
      where: {
       owner : {
        some : {
            id : user.id
        }
       } 
      },
      select : {
        avatar : true ,
        id : true ,
        name : true ,
        headline : true 
      }
      
    });
  
    
   console.log(orgs);
   
    if (!orgs) {
      return NextResponse.json({
        message: "user not yet created Org",
        orgs:null
      });
    } 
  
      return NextResponse.json({
        message: "User Orgs fetched Successfully",
        orgs: orgs,
      });
    }
  
  
  
  