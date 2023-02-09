import {
  GET_ROOMS_PENDING,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_FAIL,
} from "./action1";

const initState = {
  recent_chat: [],
  loading: false,
  error: false,
};
export const recentChatReducerOne = (store = initState, action) => {
  switch (action.type) {
    case GET_ROOMS_PENDING:
      return { ...store, loading: true };

    case GET_ROOMS_SUCCESS:
      return {
        ...store,
        recent_chat: action.payload,
        loading: false,
        error: false,
      };

    case GET_ROOMS_FAIL:
      return { ...store, error: true };

    default:
      return store;
  }
};
