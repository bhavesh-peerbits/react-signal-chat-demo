import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { ChattingPage } from "./ChattingPage";
import { MyChat } from "./MyChat";
import SideNavbar from "./SideNavbar";
import { useEffect } from "react";
import { getRoomListAsync } from "./Redux/RecentChat/RecentChatNew/action1";

export const HomeComp = () => {
  const { user, loading, error } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const UserID = localStorage.getItem("UserID") || "";
  // const { chatting } = useSelector((store) => store.chatting);

  // const { messages }= useSelector((store) => store.chattingOne);
  const { chatting, messages } = useSelector((store) => store.chattingOne);

  // if (!user._id) {
  //   return <Navigate to="/register" />;
  // }
  useEffect(() => {
    dispatch(getRoomListAsync(UserID));
  }, [UserID]);
  return (
    <div className="home-cont">
      {/* <SideNavbar /> */}
      <MyChat />
      {/* {chatting._id ? <ChattingPage /> : <MessageStarter {...user} />} */}
      {chatting?.length > 0 ? <ChattingPage /> : <MessageStarter {...user} />}
    </div>
  );
};

const MessageStarter = ({ pic, name }) => {
  return (
    <div className="chattingpage start-msg">
      <div>
        <Avatar src={pic} sx={{ width: 70, height: 70 }} />
        <h3>Welcome, {name}</h3>
        <p>Please select a chat to start messaging.</p>
      </div>
    </div>
  );
};
