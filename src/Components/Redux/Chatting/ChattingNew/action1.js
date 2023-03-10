import axios from "axios";

export const CURRENT_MESSAGE_PENDING = "CURRENT_MESSAGE_PENDING";
export const CURRENT_MESSAGE_SUCCESS = "CURRENT_MESSAGE_SUCCESS";
export const CURRENT_MESSAGE_FAIl = "CURRENT_MESSAGE_FAIl";

export const MESSAGE_RECEIVED = "MESSAGE_RECEIVED";
export const DELETE_MESSAGE = "DELETE_MESSAGE";

// set room data
export const SELECT_ROOM_DATA = "SELECT_ROOM_DATA";

export const currentMessagePending = () => ({ type: CURRENT_MESSAGE_PENDING });
export const currentMessageSuccess = (payload) => ({
  type: CURRENT_MESSAGE_SUCCESS,
  payload,
});
export const currentMessageFail = () => ({ type: CURRENT_MESSAGE_FAIl });

export const messageReceived = (payload) => ({
  type: MESSAGE_RECEIVED,
  payload,
});

export const deleteMessage = (payload) => ({
  type: DELETE_MESSAGE,
  payload,
});

export const selectRoomData = (payload) => ({
  type: SELECT_ROOM_DATA,
  payload,
});

const BASE_URL = "http://192.168.1.56:81";

export const fetchCurrentMessagesAsync = (boardName) => async (dispatch) => {
  dispatch(currentMessagePending());
  const url = `${BASE_URL}/GetMessagesByBoardName`;
  try {
    let res = await axios(url, {
      method: "post",
      params: {
        boardName: boardName,
      },
    });
    let data = await res.data;
    // connection.emit("join chat", id);
    dispatch(currentMessageSuccess(data));
  } catch (err) {
    console.log(err);
    dispatch(currentMessageFail());
  }
};

export const sendMessageApiAsync =
  (senderID, MBID, message, connection) => async (dispatch) => {
    const url = `${BASE_URL}/CreateGroupMessage`;
    try {
      let res = await axios(url, {
        method: "POST",
        params: {
          SenderID: senderID,
          MBID: MBID,
          MessageString: message,
        },
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `Bearer ${token}`,
        // },
      });
      let data = await res.data.data;
      const payload = {
        messageID: data._id,
        senderID: data.senderID,
        mbid: data.mbid,
        messageString: data.messageString,
        timestamp: data.timestamp,
        replyOf: null,
      };
      // connection.invoke("addMessageBoardMessage", data);
      dispatch(messageReceived(payload));
      dispatch(fetchCurrentMessagesAsync("test-room"));
    } catch (err) {
      console.log(err.message);
    }
  };

export const deleteGroupMessageAsync =
  (messageId, senderId, connection) => async (dispatch) => {
    const url = `${BASE_URL}/DeleteGroupMessage`;
    console.log(messageId, "messageId");
    try {
      let res = await axios(url, {
        method: "DELETE",
        params: {
          messageID: messageId,
          userID: senderId,
        },
      });
      let data = await res.data.data;

      dispatch(deleteMessage(data));
      // connection.invoke("removeMessageBoardMessage", messageId);
      // dispatch(fetchCurrentMessagesAsync("test-room"));
    } catch (err) {
      console.log(err.message);
    }
  };
