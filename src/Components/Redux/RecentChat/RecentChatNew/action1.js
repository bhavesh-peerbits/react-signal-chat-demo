import axios from "axios";

export const GET_ROOMS_PENDING = "GET_ROOMS_PENDING";
export const GET_ROOMS_SUCCESS = "GET_ROOMS_SUCCESS";
export const GET_ROOMS_FAIL = "GET_ROOMS_FAIL";

export const getRoomListPending = () => ({ type: GET_ROOMS_PENDING });
export const getRoomListSuccess = () => ({ type: GET_ROOMS_SUCCESS });
export const getRoomListFail = () => ({ type: GET_ROOMS_FAIL });

export const getRoomListAsync = () => async (dispatch) => {
  getRoomListPending();
  const url = `http://192.168.1.56:86/api/Rooms`;
  try {
    let res = await axios(url, {
      method: "get",
    });
    let data = await res.json();
    dispatch(getRoomListSuccess(data));
  } catch (err) {
    dispatch(getRoomListFail(true));
    console.log(err.message);
  }
};
