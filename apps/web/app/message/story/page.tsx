"use client";
import React from "react";
import MessagesNavbar from "../MessagesNavbar";
import { useQuery } from "@tanstack/react-query";
import { getOrgsMEssage } from "../../../constants/MessageQueryFn";
import { useSocket } from "../../custom-Hooks/SocketProvider";
import { Avatar } from "@mui/material";
import { orgs } from "../../../constants/MessageQueryFn";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { inOrg } from "../../../store/org/orgSlice";
import { useQueryClient } from "@tanstack/react-query";
import { StoriesType, getStories } from "../../../constants/StoryQueryFN";
import { inStoryMessage } from "../../../store/MessageStory/slice";

function page() {
  const { data: stories, isLoading } = useQuery({
    queryKey: ["messages/stories"],
    queryFn: async () => await getStories(),
  });
  const queryClient = useQueryClient();
  const { joinRoom , clearMessages } = useSocket();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  
  const RoomJoin = async (roomName: string) => {
    const res = await joinRoom(roomName);
    console.log(`join Room Response ${res} `);
    return res;
  };
  if (isLoading) {
    return <div>orgs loading</div>;
  }


  const click = async (story: StoriesType) => {
    const res = await RoomJoin(story.socketRoomName);
    if (res) {
      dispatch(inStoryMessage(story));
      await queryClient.invalidateQueries({ queryKey: ["storyMessages"] });
      // clears the existing messages of useSocket hook
      clearMessages()
      router.push(`/message/story/${story.id}`);
    }
  };
  return (
    <div>
      <MessagesNavbar />

      {stories?.map((story) => (
        <div
          className=" m-3  flex flex-row gap-4 cursor-pointer"
          onClick={() => click(story)}
        >
          
          <h1 className=" text-white">{story.name}</h1>
        </div>
      ))}
    </div>
  );
}

export default page;
