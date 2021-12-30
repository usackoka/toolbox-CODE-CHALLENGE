import { configureStore } from '@reduxjs/toolkit';
import { palabraSlice } from './states'

export default configureStore({
  reducer: {
    palabra: palabraSlice.reducer
  }
});