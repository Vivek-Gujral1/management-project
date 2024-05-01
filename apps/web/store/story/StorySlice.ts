import { Story } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StoryType } from "../../constants/StoryQueryFN";

export interface stateTypes {
    status : boolean ,
    story : StoryType | null
}

const initialState : stateTypes = {
    status : false ,
    story : null
}

const storySlice = createSlice({
    name : "stroy" ,
    initialState ,
    reducers : {
        inStory : (state , action : PayloadAction<StoryType>) =>{
          state.status  = true ,
          state.story = action.payload
        } ,
        outStory : (state) =>{
         state.status = false ,
         state.story = null
        }
    }
})
export  const {inStory , outStory} = storySlice.actions
export default storySlice.reducer
