import React from "react";
import { searchedItems } from "../constants/SearchQueryFn";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../@/components/ui/avatar";
import { Button } from "../@/components/ui/button";
import {
  INotification,
  ITask,
  useSocket,
} from "../app/custom-Hooks/SocketProvider";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";

function SendTaskEmployeesCard({ user }: { user: searchedItems }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { sendTask, sendNotifications } = useSocket();
  const task = useSelector((state: RootState) => state.task.Task);
  const story = useSelector((state: RootState) => state.story.story);
  if (task === null) {
    return <div>SomeThing Went Wrong</div>;
  }
  if (story === null) {
    return <div>Something Went Wrong Story</div>;
  }

  const sendTaskToUser = async () => {
    const sendTaskType: ITask = {
      content: task?.content,
      reciver: user,
      title: task?.title,
      sender: task.Manager,
    };

    const res = await sendTask(story.socketRoomName, sendTaskType);
    console.log("send task res", res);

    if (res) {
      const Notification: INotification = {
        content: `${sendTaskType.sender.name} just Gave you a Task`,
        reciever: {
          avatar: sendTaskType.reciver.avatar,
          id: sendTaskType.reciver.id,
          name: sendTaskType.reciver.name,
        },
        sender: {
          avatar: `${sendTaskType.sender.avatar}`,
          id: `${sendTaskType.sender.id}`,
          name: `${sendTaskType.sender.name}`,
        },
      };
      const sendNotificationRoomName = `${sendTaskType.reciver.id}_${sendTaskType.reciver.name}`;
      console.log("roomName");
      
      const notificationRes = await sendNotifications(
        sendNotificationRoomName,
        Notification
      );
      console.log("Notificationres", notificationRes);

      const DatabaseTaskDetails = {
        content: sendTaskType.content,
        title: sendTaskType.title,
      };
      const { data } = await axios.post(
        `/api/org/story/task/create-task?reciverID=${sendTaskType.reciver.id}&storyID=${story.id}`,
        DatabaseTaskDetails
      );
      console.log("axios data", data);
    }
  };

  const pushToProfile = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["profile/user"],
      exact: true,
    });
    router.push(`/Profile/${user.id}`);
  };
  return (
    <div className="bg-white shadow-md rounded-md p-4 flex items-center cursor-pointer ">
      <Avatar>
        <AvatarImage src={user.avatar ? user.avatar : ""} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className=" ml-3">
        <h2 onClick={pushToProfile} className="text-xl font-semibold">
          {user.name}
        </h2>
        <p className="text-gray-600">{user.email}</p>

        <Button onClick={sendTaskToUser} className=" bg-blue-500 text-white">
          Send
        </Button>
      </div>
    </div>
  );
}

export default SendTaskEmployeesCard;
