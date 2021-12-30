import { configureStore } from '@reduxjs/toolkit';
import { palabraSlice } from './states/palabra.state';

export default configureStore({
  reducer: {
    palabra: palabraSlice.reducer
  }
});