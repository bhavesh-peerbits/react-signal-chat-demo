import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { ChattingPage } from "./ChattingPage";
import { MyChat } from "./MyChat";
import SideNavbar from "./SideNavbar";

export const HomeComp = () => {

  const { user, loading, error } = useSelector((store) => store.user);
  // const { chatting } = useSelector((store) => store.chatting);

  // const { messages }= useSelector((store) => store.chattingOne);
  const messages = [
    {
        id: 18,
        content: "Hello guys, how are you doing?",
        timestamp: "2023-02-09T05:29:06.4955229+00:00",
        fromUserName: "admin2",
        fromFullName: "Maria Nikolaou",
        room: "Lobby",
        avatar: "avatar2.jpg"
    },
    {
        id: 19,
        content: "Good, and you?",
        timestamp: "2023-02-09T05:29:07.4955229+00:00",
        fromUserName: "admin",
        fromFullName: "James Smith",
        room: "Lobby",
        avatar: "avatar1.jpg"
    },
    {
        id: 20,
        content: "I'm good <img class=\"emoji\" src=\"/images/emojis/emoji1.png\">",
        timestamp: "2023-02-09T05:29:08.4955229+00:00",
        fromUserNam: "admin2",
        fromFullName: "Maria Nikolaou",
    room: "Lobby",
        avatar: "avatar2.jpg"
    },

]

  // if (!user._id) {
  //   return <Navigate to="/register" />;
  // }

  return (
    <div className="home-cont">
      {/* <SideNavbar /> */}
      <MyChat />
      {/* {chatting._id ? <ChattingPage /> : <MessageStarter {...user} />} */}
        {messages.length > 0 ? <ChattingPage /> : <MessageStarter {...user} />}
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
