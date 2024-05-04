import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import prisma from "../../../../../constants/prisma";
import { ApiError } from "../../../../../utility/ApiError";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { name }: { name: string } = reqBody;
  const SearchParams = req.nextUrl.searchParams;
  const orgID = SearchParams.get("orgId");
  
  if (!orgID) {
    throw new ApiError(400, "cannot get orgId from route query parameters");
  }

  const org = await prisma.org.findFirst({
    where: {
      id: orgID,
    },
  });

  if (!org) {
    throw new ApiError(400, "cannot get OrgID with searchParams");
  }

  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!user) {
    throw new ApiError(
      401,
      "user not found with session id please login a user"
    );
  }

  const storyRoomName = `${org.id}_${name}`;

  const verifyStoryRoomName = await prisma.story.findFirst({
    where: {
      name: storyRoomName,
    },
  });

  if (verifyStoryRoomName) {
    throw new ApiError(400, "Org already make a story with this name");
  }

  const newStory = await prisma.story.create({
    data: {
      name: name,
      socketRoomName: storyRoomName,
      manager: {
        connect: {
          id: user.id,
        },
      },
      org: {
        connect: {
          id: org.id,
        },
      },
    },
    include: {
      manager: true,
      org: true,
    },
  });

  const createdStory = await prisma.story.findFirst({
    where: {
      id: newStory.id,
    },
  });

  if (!createdStory) {
    throw new ApiError(500, "Something went wrong while making Story");
  }

  return NextResponse.json({
    story: newStory,
  });
}
