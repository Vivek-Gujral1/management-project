"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getHomePage } from "../constants/HomePageQuery";
import SearchComponent from "../Components/SearchComponent";
import Post from "../Components/Post";

function HoemPage() {
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
      <SearchComponent />
      <div className=" flex flex-col gap-4">
        {data?.posts.map((post) => <Post post={post}></Post>)}
      </div>
    </main>
  );
}

export default HoemPage;
