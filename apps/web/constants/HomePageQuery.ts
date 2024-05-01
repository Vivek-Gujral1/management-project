import axios from "axios"
import { postInterface, postType } from "../app/api/post/get-posts/route"

export interface HomePageTask {
    story : taskStory 
    isCompleted : boolean
    sender : sender ,
    title : string ,
    content : string ,
    createdAt : Date
  }
  
  interface taskStory {
    socketRoomName : string ,
      name : string ,
  }

    
  interface sender {
    avatar : string | null 
    name : string ,
    id : string
  }
  
 interface ReturnTypeHomePage {
    message : string 
    posts   : Array<postInterface>
    tasks   : null | Array<HomePageTask>
 } 

export const getHomePage =  async() => {
    const {data} : {data : ReturnTypeHomePage} = await axios.get("/api/homepage")
    return data
}