import axios from "axios"
import { ITask } from "../app/custom-Hooks/SocketProvider"

interface REturnTypeGetTasks {
    message : string
    tasks   : Array<ITask> | null
}

export const getTasks = async (storyID  : string | undefined) => {

    console.log("StoryIDgfxhggjhhhhhf" , storyID);
    
    
 const {data} : {data : REturnTypeGetTasks} = await axios.get(`/api/org/story/task/get-tasks?storyID=${storyID}`)
 return data.tasks
}