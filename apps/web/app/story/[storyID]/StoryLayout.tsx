"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useQuery } from "@tanstack/react-query";
import { getStory } from "../../../constants/StoryQueryFN";
import { useDispatch } from "react-redux";
import { inStory } from "../../../store/story/StorySlice";
import { Button } from "../../../@/components/ui/button";
import StoryGeneral from "./StoryGeneral";
import StoryTasks from "./StoryTasks";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface FormValues {
  GeneralPage: boolean;
  TasksPage: boolean;
}

function StoryLayout() {
   const router = useRouter()

  const [GeneralPage, setGeneralPage] = useState<boolean>(true);
  const [TasksPage, setTasksPage] = useState<boolean>(false);
  const queryClient = useQueryClient()

  const handleCheckboxChange = async (name: keyof FormValues) => {
    if (name === "GeneralPage" && !GeneralPage) {
      setGeneralPage(true);
      setTasksPage(false);
    } else if (name === "TasksPage" && !TasksPage) {
      setGeneralPage(false);
      setTasksPage(true);
      await queryClient.invalidateQueries({queryKey : ["tasks"]})
    }
  };

  const dispatch = useDispatch();
  const storyID = useSelector((state: RootState) => state.storyID.storyID);
  if (!storyID) {
    return <div>Soemthing went wrong</div>;
  }

  const pushtostoryChat = (storyID:string)=>{
   
     router.push(`/message/story/${storyID}`)

  }

  const { data: FetchStory, isLoading } = useQuery({
    queryKey: ["story"],
    queryFn: async () => await getStory(storyID),
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (!FetchStory) {
    return <div> Story nahi hai</div>;
  } else {
    dispatch(inStory(FetchStory));
  }

  return (
    <section className="  flex flex-col  gap-5">
      <div className=" flex flex-row justify-center items-center gap-8">
        <Button
          className={`text-white ${GeneralPage ? "bg-blue-500" : ""} `}
          onClick={() => handleCheckboxChange("GeneralPage")}
        >
          General
        </Button>
        <Button
          className={`text-white ${TasksPage ? "bg-blue-500" : ""} `}
          onClick={() => handleCheckboxChange("TasksPage")}
        >
          Tasks
        </Button>
        <Button   className={`text-white  `}>Chat</Button>
      </div>

      <div>
        {GeneralPage && (
          <div>
            {" "}
            <StoryGeneral />{" "}
          </div>
        )}
        {TasksPage && (
          <div>
            {" "}
            <StoryTasks />{" "}
          </div>
        )}
      </div>
    </section>
  );
}

export default StoryLayout;
