import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import listsReducer from "../features/lists/listsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    lists: listsReducer,
  },
});
