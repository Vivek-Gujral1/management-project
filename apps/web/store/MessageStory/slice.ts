
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StoriesType } from "../../constants/StoryQueryFN";

export interface stateTypes {
    status : boolean ,
    story : StoriesType | null
}

const initialState : stateTypes = {
    status : false ,
    story : null
}

const storyMessageSlice = createSlice({
    name : "stroy" ,
    initialState ,
    reducers : {
        inStoryMessage : (state , action : PayloadAction<StoriesType>) =>{
          state.status  = true ,
          state.story = action.payload
        } ,
        outStoryMessage : (state) =>{
         state.status = false ,
         state.story = null
        }
    }
})
export  const {inStoryMessage , outStoryMessage} = storyMessageSlice.actions
export default storyMessageSlice.reducer
