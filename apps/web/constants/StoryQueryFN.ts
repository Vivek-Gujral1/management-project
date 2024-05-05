import axios from "axios"
import { TcreateStorySchema } from "./zodTypes"

export interface StoriesType {
   id : string ,
   name : string ,
   socketRoomName : string  
   manager : user
   bio : string 
}
interface user  {
   name : string 
   avatar : string | null
   id : string  
   
}

interface getStories {
   message : string 
   stories : Array<StoriesType>
}

export interface StoryType {
   employees : Array<employess>
   manager   : user
   name   : string
   createdAt : Date
  org  : Array<org>
  bio  : string
  id : string
  socketRoomName : string
}
interface org {

      name : string
      avatar : string | null
      email : string
   
}
interface ReturnTypeGetStory {
   message : string
   story : StoryType
}
interface employess  {
   name : string 
   avatar : string | null
   id : string 
   email:string
}
interface getEmployess{
   message:string
   employess:Array<employess>
}



export const getStory = async(storyId : string) => {
   const {data} : {data : ReturnTypeGetStory}=  await axios.get(`/api/org/story/get-story?storyID=${storyId}`)
  console.log(data);
  
   return data.story
}

export const SearchStory = async (storyName : string) =>{
   const {data} = await axios.get(`/api/org/story/search-story?storyName=${storyName} `)

   return data.story
}

export const getTasks = async (storyID : string) => {
   const {data} = await axios.get(`/api/org/story/task/get-tasks?storyID=${storyID}`)

   return data
}


export const getStories = async () => {
   const {data} : {data : getStories} = await axios.get(`/api/org/story/org-stories`)
   return data.stories
}

export const createStory = async(orgId:string,comingdata:TcreateStorySchema)=>{
   const {data} = await axios.post(`/api/org/story/createStory?orgId=${orgId}`,comingdata)
   return data
}
export const getStoryMembers = async(storyId:string)=>{
   const {data} :{data:getEmployess} = await axios.get(`/api/org/story/get-employess-story?StoryID=${storyId}`)
   return data.employess
}