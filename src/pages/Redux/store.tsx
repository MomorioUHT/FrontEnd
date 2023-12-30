import {configureStore} from "@reduxjs/toolkit";
import { problemsApi,userApi } from "./Api";

export const store = configureStore({
  reducer: {
    [problemsApi.reducerPath]: problemsApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(problemsApi.middleware).concat(userApi.middleware)
})