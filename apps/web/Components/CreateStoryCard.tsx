"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm  , SubmitHandler} from "react-hook-form"
import {
  Form as ShadcnForm,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../@/components/ui/form";
import { Input } from "../@/components/ui/input";
import { Button } from "../@/components/ui/button";
import { login as authLogin } from "../store/auth/authSlice";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react"
import { loginSchema, TcreateStorySchema, TLoginSchema,createStorySchema } from "../constants/zodTypes";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {createStory  as AxiosCreateStory} from "../constants/StoryQueryFN"


function  CreateStoryCard({orgID} : {orgID : string}) {
    const router = useRouter()
    
    const queryClient = useQueryClient();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<TcreateStorySchema>({
        resolver: zodResolver(createStorySchema),
        defaultValues: {
            name:"",
            headline:""
       
        },
      });

      const create: SubmitHandler<TcreateStorySchema> = async (comingData) => {
        console.log("clicked");
        createStory(comingData);
      };


    const {mutate:createStory,isPending,data}= useMutation({
        mutationFn: async (comingData : TcreateStorySchema) => await AxiosCreateStory(orgID , comingData ) ,
        onSuccess : async () => {
            console.log("createStory" , data);
            
            await queryClient.invalidateQueries({queryKey : [""]})
        }
    })
  return (
    <ShadcnForm {...form}>
    <form onSubmit={form.handleSubmit(create)} className="space-y-8">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">email</FormLabel>
            <FormControl>
              <Input placeholder="Enter Story Name" {...field} className=" h-10" />
            </FormControl>
            {/* <FormDescription className=" text-white">
              This is your public display name.
            </FormDescription> */}
            <FormMessage className=" text-red-900 text-xl" />
          </FormItem>
        )}
      />
       
        <FormField
        control={form.control}
        name="headline"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Password</FormLabel>
            <FormControl>
              <Input placeholder="Enter Story Headline" {...field} className=" h-10" />
            </FormControl>
            {/* <FormDescription className=" text-white">
              This is your public display name.
            </FormDescription> */}
             <FormMessage className=" text-red-900 text-xl" />
          </FormItem>
        )}
      />
       
      <Button type="submit" className='w-full bg-white ' disabled={isPending}>
              {isPending ? (
                <>
                  {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                  Please wait
                </>
              ) : (
                'Sign-In'
              )}
            </Button>
    </form>
  </ShadcnForm>
  )
}

export default CreateStoryCard