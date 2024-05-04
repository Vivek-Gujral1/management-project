import axios from "axios"

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
   employees : Array<user>
   manager   : user
   name   : string
   createdAt : Date
  org  : Array<org>
  bio  : string
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