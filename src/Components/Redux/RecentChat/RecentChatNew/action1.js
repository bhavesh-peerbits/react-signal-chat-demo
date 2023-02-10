import axios from "axios";

export const GET_ROOMS_PENDING = "GET_ROOMS_PENDING";
export const GET_ROOMS_SUCCESS = "GET_ROOMS_SUCCESS";
export const GET_ROOMS_FAIL = "GET_ROOMS_FAIL";

export const getRoomListPending = () => ({ type: GET_ROOMS_PENDING });
export const getRoomListSuccess = (payload) => ({
  type: GET_ROOMS_SUCCESS,
  payload,
});
export const getRoomListFail = () => ({ type: GET_ROOMS_FAIL });

const BASE_URL = "http://192.168.1.56:81";

export const getRoomListAsync = (SenderID) => async (dispatch) => {
  getRoomListPending();
  const url = `${BASE_URL}/GetMessageBoardListByUserID`;
  try {
    let res = await axios(url, {
      method: "POST",
      params: {
        SenderID: SenderID,
      },
    });
    let data = await res.data;
    dispatch(getRoomListSuccess(data));
  } catch (err) {
    dispatch(getRoomListFail(true));
    console.log(err.message);
  }
};
