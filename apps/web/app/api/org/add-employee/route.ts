import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "../../../../utility/ApiError";
import prisma from "../../../../constants/prisma";


export async function  POST(req : NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const orgId = searchParams.get("orgID")
    
    if (!orgId) {
        throw new ApiError(400 , "cannot get orgID from searchparams")
    }
    if (orgId.trim() === "") {
        throw new ApiError(400 , "orgId is empty")
    }

    const org = await prisma.org.findFirst({
        where : {
            id : orgId
        }
    })

    if (!org) {
        throw new ApiError(400 , "cannot find org with this id")
    }
 
    const employeeID = searchParams.get("employeeID")
    if (!employeeID) {
        throw new ApiError(400 , "cannot get employeeId by searchParams")
    }

    if (employeeID.trim() === "") {
        throw new ApiError(400 , "employeeID is empty")
    }

    const employee = await prisma.user.findFirst({
        where : {
            id : employeeID
        }
    })

    if (!employee) {
        throw new ApiError(400 , "cannot find emplyee with this employeeID")
    }

    const addEmployee  = await prisma.org.update({
        where : {
            id : org.id
        } ,
        data : {
            employees : {
                connect : {
                    id : employee.id
                }
            }
        } ,
        select : {
            id : true ,
            employees : {
                select : {
                    name : true ,
                    avatar : true
                }
            }
        }
    })

    return NextResponse.json({
        message : "emplyee added successfully" ,
        org : addEmployee
    })
}