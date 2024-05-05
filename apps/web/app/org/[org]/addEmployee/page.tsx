// "use Client"
// import React from 'react'
// import { SubmitHandler, useForm } from 'react-hook-form'
// import { Input } from '../../../../@/components/ui/input'
// import axios from 'axios'
// interface formType{
//     query:string
// }

// function page() {
//     let query : string ;
//     const {register,handleSubmit}= useForm<formType>()
//     const SearchUser : SubmitHandler<formType>  =  (data:formType)=>{
//       query = data.query

//     }

//   return (
//     <form onSubmit={handleSubmit(SearchUser)}>

//     <Input {...register("query")}/>
//     </form>

//   )
// }

// export default page

// pages/search.tsx
"use client";
// pages/search.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { searchUser } from "../../../../constants/SearchQueryFn";
import AddEmployee from "../../../../Components/AddEmployee";

const Search: React.FC = () => {
  let searchQuery : string ; 
  const { register, handleSubmit } = useForm();

  const { data, isLoading, isError ,refetch } = useQuery({
    queryKey: ["Search/Employee"],
    queryFn: () => searchUser(searchQuery),
    enabled: false,
  });

  const onSubmit = (formData: any) => {
     searchQuery = formData.search;
       refetch()
  };
 
  console.log(data);
  
  return (
    <div className="flex justify-center items-center gap-4">
      <div className="w-full max-w-lg ">
        <h1 className="text-3xl font-bold text-white ">Add Employee</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center border-b  border-white py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="search"
              placeholder="Search employee..."
              aria-label="Search"
              {...register("search")}
            />
            <button
              className="flex-shrink-0 bg-white  border-white  text-sm border-4 text-black py-1 px-2 rounded"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>

        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching data</p>}
        {data?.users ? data.users.map((user)=>(
            <AddEmployee user={user} />
        )) : "Could Not Find Any User"}
      </div>
    </div>
  );
};

export default Search;
