"use client";
import React, { useState } from "react";
import { postInterface, postType } from "../app/api/post/get-posts/route";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "../constants/PostQueryFN";
import { INotification, useSocket } from "../app/custom-Hooks/SocketProvider";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";

function Post({ postData }: { postData: postInterface }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  console.log("postData", postData);
  const [isLiked, setIsLiked] = useState(postData.isLiked);
  const { sendNotifications } = useSocket();
  const userData = useSelector((state: RootState) => state.auth.userData);

  const pushToPost = async () => {
    await queryClient.invalidateQueries({ queryKey: ["post"], exact: true });
    await queryClient.invalidateQueries({
      queryKey: ["post-comments"],
      exact: true,
    });
    router.push(`/posts/${postData.post.id}`);
  };

  const togglelike = async () => {
    const likeStatus = await toggleLike(postData.post.id);
    console.log("like Status", likeStatus);
    if (likeStatus !== null) {
      setIsLiked(likeStatus);
      if (likeStatus) {
        if (userData) {
          const notificationRoomName = `${postData.post.postOwner.id}_${postData.post.postOwner.name}`;
          const Notification: INotification = {
            content: `${userData.name} just liked Your Post`,
            reciever: {
              avatar: postData.post.postOwner.avatar,
              id: postData.post.postOwner.id,
              name: postData.post.postOwner.name,
            },
            sender: {
              avatar: userData.avatar,
              id: userData.id,
              name: userData.name,
            },
          };
          const createNotification = await sendNotifications(
            notificationRoomName,
            Notification
          );
          if (createNotification) {
            const create =  await axios.post(`/api/notifications/post-notification?postID=${postData.post.id}&recieverID=${Notification.reciever.id}` , {
              content : Notification.content
             })
             console.log("create Notification axios data" , create);
             
          }
        }
      }
    }
  };

  return (
    <div className=" h-[300px] w-full border border-white ">
      <div className=" h-1/6 flex flex-row justify-center gap-12  items-center">
        <h2 className=" text-white text-lg"> {postData.post.postOwner.name}</h2>
        <p className=" text-white">18 Aprail 22:09</p>
      </div>

      <div
        onClick={async () => await pushToPost()}
        className=" cursor-pointer h-2/3 w-full"
      >
        <img
          src={postData.post.photo ? postData.post.photo : ""}
          alt=""
          className=" h-full w-full"
        />
      </div>

      <div className=" h-1/6 w-full flex flex-row justify-center gap-5  items-center">
        <p onClick={togglelike} className=" text-white cursor-pointer">
          {isLiked ? "Liked" : "Like"}
        </p>
        <p className=" text-white">Comments</p>
        <p className=" text-white">Share</p>
      </div>
    </div>
  );
}

export default Post;
