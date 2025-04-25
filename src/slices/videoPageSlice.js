import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoPlaying:null,
};

const videoPageSlice = createSlice({
  name: "videoPage",
  initialState,
  reducers:{
    setVideoPlaying:(state,action)=>{
        state.videoPlaying=action.payload;
        return state;
    }
  }
});

export const {
  setVideoPlaying
} = videoPageSlice.actions;

export default videoPageSlice;
