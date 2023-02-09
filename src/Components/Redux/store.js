import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer } from "./Auth/reducer";
import { chattingReducer } from "./Chatting/Reducer";
import { notyficationReducer } from "./Notification/reducer";
import { recentChatReducer } from "./RecentChat/reducer";
import { serachReducer } from "./Searching/reducer";
import { recentChatReducerOne } from "./RecentChat/RecentChatNew/reducer1";
import { chattingReducerOne } from "./Chatting/ChattingNew/Reducer1";

const loggerMiddleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch);
  }
  next(action);
};

export const store = configureStore({
  reducer: {
    user: authReducer,
    search: serachReducer,
    recentChat: recentChatReducer,
    chatting: chattingReducer,
    notification: notyficationReducer,

    recentChatOne: recentChatReducerOne,
    chattingOne: chattingReducerOne,
  },
  middleware: [...getDefaultMiddleware(), loggerMiddleware],
});
