import axios from "axios";

export const CURRENT_MESSAGE_PENDING = "CURRENT_MESSAGE_PENDING";
export const CURRENT_MESSAGE_SUCCESS = "CURRENT_MESSAGE_SUCCESS";
export const CURRENT_MESSAGE_FAIl = "CURRENT_MESSAGE_FAIl";

export const MESSAGE_RECEIVED = "MESSAGE_RECEIVED";

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

export const fetchCurrentMessagesAsync = (roomNameId) => async (dispatch) => {
  dispatch(currentMessagePending());
  const url = `http://192.168.1.56:86/api/Messages/Room/${roomNameId}`;
  try {
    let res = await axios(url, {
      method: "post",
    });
    let data = await res.json();
    //   socket.emit("join chat", id);
    dispatch(currentMessageSuccess(data));
  } catch (err) {
    console.log(err);
    dispatch(currentMessageFail());
  }
};

export const sendMessageApiAsync =
  (id, receiverId, message, connection) => async (dispatch) => {
    const url = `http://192.168.1.56:86/CreateMessage`;
    try {
      let res = await axios(url, {
        method: "POST",
        body: {
          SenderID: id,
          ReceiverID: receiverId,
          MessageString: message,
        },
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `Bearer ${token}`,
        // },
      });
      let data = await res.json();
      connection.invoke("newMessage", data);
      dispatch(messageReceived(data));
    } catch (err) {
      console.log(err.message);
    }
  };
