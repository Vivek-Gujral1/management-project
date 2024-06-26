import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "../../../constants/prisma";
import { postInterface, postType } from "../post/get-posts/route";
import { checkIsLiked } from "../post/get-posts/route";

const getPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      impressions: true,
      createdAt: true,
      likes: {
        select: {
          likedByID: true,
          likedBy: {
            select: {
              name: true,
              avatar: true,
              id : true
            },
          },
        },
      },
      title: true,
      photo: true,
      videoFile: true,
      videoDuration: true,
      postOwner: {
        select: {
          name: true,
          avatar: true,
          id: true,
        },
      },
      id: true,
    },
    take: 6,
  });
  return posts;
};
const convertPost = async (
  posts: Array<postType>,
  index: number,
  convertedPosts: Array<postInterface>,
  userID: string
): Promise<Array<postInterface>> => {
  if (index >= posts.length) {
    return convertedPosts;
  }
  if (!posts) {
    return convertedPosts;
  }

  const currentPost = posts[index];

  if (currentPost && currentPost.id) {
    const isLiked = await checkIsLiked(currentPost.id, userID);
    const postConvert: postInterface = {
      isLiked: isLiked,
      post: currentPost,
      postLikes: currentPost.likes.length,
    };
    convertedPosts = [...convertedPosts, postConvert];
  }

  return convertPost(posts, index + 1, convertedPosts, userID);
};

const convertPostWithoutLogin = async( posts: Array<postType>,
  index: number,
  convertedPosts: Array<postInterface>,) : Promise<Array<postInterface>> => {
    if (index >= posts.length) {
      return convertedPosts;
    }
    if (!posts) {
      return convertedPosts;
    }

    const currentPost  = posts[index]

    if (currentPost && currentPost.id) {
      const postConvert: postInterface = {
        isLiked: null,
        post: currentPost,
        postLikes: currentPost.likes.length,
      };
      convertedPosts = [...convertedPosts, postConvert];
    }

    return convertPostWithoutLogin(posts , index + 1 , convertedPosts)
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    const posts = await getPosts();
    let convertedPosts: Array<postInterface> = [];

    const postsConvert = await convertPostWithoutLogin(posts , 0 , convertedPosts )

    return NextResponse.json({
      message: "Home Page without login",
      posts: postsConvert,
      tasks: null,
    });
  } else {
    const user = session.user;
    const userTasks = await prisma.task.findMany({
      where: {
        reciverId: user.id,
      },
      take: 2,
      orderBy: {
        createdAt: "desc",
      },
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
    });
    const posts = await getPosts();

    let convertedPosts: Array<postInterface> = [];

    const convertPosts = await convertPost(posts, 0, convertedPosts, user.id);

    return NextResponse.json({
      message: "homepage items fetched",
      tasks: userTasks,
      posts: convertPosts,
    });
  }
}
