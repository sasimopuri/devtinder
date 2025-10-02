import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import incommingRequestsReducer from "./incommingRequestsSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    incommingRequests: incommingRequestsReducer,
  },
});

export default appStore;
