import axios from "axios"
import { postInterface, postType } from "../app/api/post/get-posts/route"
import { ITask } from "../app/custom-Hooks/SocketProvider"


  
 interface ReturnTypeHomePage {
    message : string 
    posts   : Array<postInterface>
    tasks   : null | Array<ITask>
 } 

export const getHomePage =  async() => {
    const {data} : {data : ReturnTypeHomePage} = await axios.get("/api/homepage")
    return data
}