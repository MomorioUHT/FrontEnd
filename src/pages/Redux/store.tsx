import {configureStore} from "@reduxjs/toolkit";
import { problemsApi,userApi,labApi } from "./Api";

export const store = configureStore({
  reducer: {
    [problemsApi.reducerPath]: problemsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [labApi.reducerPath]: labApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(problemsApi.middleware).concat(userApi.middleware).concat(labApi.middleware)
})