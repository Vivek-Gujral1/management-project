"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSocket } from "../../../custom-Hooks/SocketProvider";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../../../constants/MessagesQueryFN";
import Message from "../../Message";
import { useSession } from "next-auth/react";
import { message } from "../../../custom-Hooks/SocketProvider";
import { IoSend } from "react-icons/io5";

interface dataTYpe {
  message: string;
}
 
function page() {
  const { register, handleSubmit, reset } = useForm<dataTYpe>();
  const { sendMessage, Messages } = useSocket();

  const story = useSelector((state: RootState) => state.storyMEssage.story);
  const { data } = useSession();
  if (!data) {
    return <div>please Login</div>;
  }
  const user = data.user;
  if (!story) {
    return <div>story nahi hai</div>;
  }

 

  const { data: backendMessages, isLoading } = useQuery({
    queryKey: ["storyMessages"],
    queryFn: async () => await getMessages(story.socketRoomName),
  });

  if (isLoading) {
    return <div>Messages Loading</div>;
  }





  const sendmessages: SubmitHandler<dataTYpe> = async (data) => {
    console.log("message send function");

    const message: message = {
      content: data.message,
      sender: {
        avatar: user.avatar,
        id: user.id,
        name: user.name,
      },
      roomName: story.socketRoomName,
    };

    await sendMessage(story.socketRoomName, message);
    reset();
  };






  const allMessages = [...(backendMessages ?? []), ...Messages];
  console.log(allMessages);
  
  return (
  
    <div className=" h-[520px] w-full  flex flex-col gap-4 mr-5">
      <div className=" h-14 w-full border border-white flex flex-row justify-center items-center">
        <h1 className=" text-3xl text-white ">
              {story.name}
        </h1>
      </div>

      <div className=" h-2/3 border border-white overflow-auto flex flex-col-reverse ">
        <div className=" mr-5 ml-5 mt-3">
          {allMessages?.map((message) => (
            <Message
              key={message.content}
              message={message}
              isOwner={message.sender.id === user.id}
            />
          ))}
        </div>
      </div>
      <div className="  h-1/6 flex flex-row gap-5">
        <form
          className=" h-full w-full flex flex-row gap-5"
          onSubmit={handleSubmit(sendmessages)}
        >
          <textarea
            className="border border-white h-full w-4/5 resize-none pl-2"
            placeholder="Sends a Message"
            id=""
            cols={3}
            rows={1}
            {...register("message")}
          ></textarea>
          <button>
            <IoSend className=" text-3xl text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
