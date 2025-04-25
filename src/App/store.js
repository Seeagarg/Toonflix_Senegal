import { configureStore } from '@reduxjs/toolkit'
import categorySlice from '../slices/categorySlice';
import videoPageSlice from '../slices/videoPageSlice';
export const store = configureStore({
    reducer: {
       category:categorySlice.reducer,
       video:videoPageSlice.reducer
      },
    });



