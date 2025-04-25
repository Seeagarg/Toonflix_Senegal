import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  selectedCategory: '',
  videos: [],
  filteredVideos: [],
};
const categorySlice = createSlice({
  
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
      return state;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      if(action.payload=="All"){
        state.filteredVideos=state.videos;
        return state;
      }
      else{
        state.filteredVideos = state.videos.filter(
          (data) => data.sub_category_id == action.payload
        );
        return state;
      }
    },
    setVideos: (state, action) => {
      state.videos = action.payload;
      return state;
      
    },
  },
});
export const {
  setCategories,
  setSelectedCategory,
  setVideos,
  setFilteredVideos,
} = categorySlice.actions;
export default categorySlice;
