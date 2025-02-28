import { configureStore } from '@reduxjs/toolkit';
import graphReducer from '../graphs/graphSlice';

export default configureStore({
  reducer: {
    graph: graphReducer,
  },
});
