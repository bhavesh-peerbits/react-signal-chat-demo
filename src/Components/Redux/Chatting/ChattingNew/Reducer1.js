import {
  CURRENT_MESSAGE_PENDING,
  CURRENT_MESSAGE_SUCCESS,
  CURRENT_MESSAGE_FAIl,
  MESSAGE_RECEIVED,
  SELECT_ROOM_DATA,
} from "./action1";

const initState = {
  chatting: [],
  messages: [],
  roomData: {
    SenderID: "",
    MBID: "",
    roomName: "",
  },
  loading: false,
  error: false,
};
export const chattingReducerOne = (store = initState, action) => {
  switch (action.type) {
    case MESSAGE_RECEIVED:
      return {
        ...store,
        messages: [...store.messages, action.payload],
        loading: false,
        error: false,
      };
    case CURRENT_MESSAGE_PENDING:
      return { ...store, loading: true };

    case CURRENT_MESSAGE_SUCCESS:
      return {
        ...store,
        chatting: action.payload,
        loading: false,
        error: false,
      };

    case CURRENT_MESSAGE_FAIl:
      return { ...store, error: true };

    case SELECT_ROOM_DATA:
      return { ...store, roomData: action.payload };
    default:
      return store;
  }
};
