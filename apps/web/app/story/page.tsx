"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getStories } from "../../constants/StoryQueryFN";
import Story from "../../Components/Story";
import { Button } from "../../@/components/ui/button";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter()
  const { data, isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => await getStories(),
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (

   
     <main className="flex flex-col gap-5 mt-6">
     {data?.map((story) => <Story story={story} />)}
     </main>
   
  );
}

export default page;
