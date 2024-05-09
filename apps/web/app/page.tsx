"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getHomePage } from "../constants/HomePageQuery";
import Post from "../Components/Post";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import TaskCard from "../Components/TaskCard";

function HoemPage() {
  const userData = useSelector((state : RootState)=> state.auth.userData)
  const { data, isLoading } = useQuery({
    queryKey: ["HomePage"],
    queryFn: async () => await getHomePage(),
  });
  if (isLoading) {
    return <div className=" text-white">Loading</div>;
  }
  console.log(data);

  return (
    <main className=" flex flex-col gap-4">
      {userData ? 
       data?.tasks ? 
       
        <>
 <div className=" flex flex-row justify-center">
  <h2 className=" text-white text-2xl">Recently Recieved Tasks</h2>
 </div>
 { data.tasks.map((task)=>(
  <TaskCard task={task} />
))} 
    </>  
      
          
       : null 
      :
      null }
      <div className=" flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-5">
        {data?.posts.map((post) => <Post postData={post}></Post>)}
      </div>
    </main>
  );
}

export default HoemPage;
