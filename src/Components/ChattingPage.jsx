import styled from "@emotion/styled";
import CallIcon from "@mui/icons-material/Call";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { Avatar, Button } from "@mui/material";
import React, { createRef, useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import { useDispatch, useSelector } from "react-redux";
import { ChatlogicStyling, isSameSender } from "./ChatstyleLogic";
import { sendMessageApi } from "./Redux/Chatting/action";
import { addUnseenmsg } from "./Redux/Notification/action";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { messageReceived, sendMessageApiAsync } from "./Redux/Chatting/ChattingNew/action1";



export const ChattingPage = () => {
  const [connection, setConnection] = useState(null);
  console.log("connection:",connection)
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);
  const { user, token } = useSelector((store) => store.user);
  // const { messages } = useSelector((store) => store.chatting);
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
        content: "I'm good ",
        timestamp: "2023-02-09T05:29:08.4955229+00:00",
        fromUserNam: "admin2",
        fromFullName: "Maria Nikolaou",
    room: "Lobby",
        avatar: "avatar2.jpg"
    },
     {
        id: 21,
        content: "Where are you",
        timestamp: "2023-02-09T05:29:09.4955229+00:00",
        fromUserName: "admin",
        fromFullName: "James Smith",
        room: "Lobby",
        avatar: "avatar1.jpg"
    },
     {
        id: 22,
        content: "At coffee shop",
        timestamp: "2023-02-09T05:29:15.4955229+00:00",
        fromUserName: "admin2",
        fromFullName: "Maria Nikolaou",
        room: "Lobby",
        avatar: "avatar2.jpg"
    },
      {
        id: 23,
        content: "ohh great",
        timestamp: "2023-02-09T05:29:16.4955229+00:00",
        fromUserName: "admin",
        fromFullName: "James Smith",
        room: "Lobby",
        avatar: "avatar1.jpg"
    },
    {
      id: 24,
      content: "Hello guys, how are you doing?",
      timestamp: "2023-02-09T05:29:06.4955229+00:00",
      fromUserName: "admin2",
      fromFullName: "Maria Nikolaou",
      room: "Lobby",
      avatar: "avatar2.jpg"
  },
  {
      id: 25,
      content: "Good, and you?",
      timestamp: "2023-02-09T05:29:07.4955229+00:00",
      fromUserName: "admin",
      fromFullName: "James Smith",
      room: "Lobby",
      avatar: "avatar1.jpg"
  },
  {
      id: 26,
      content: "I'm good ",
      timestamp: "2023-02-09T05:29:08.4955229+00:00",
      fromUserNam: "admin2",
      fromFullName: "Maria Nikolaou",
  room: "Lobby",
      avatar: "avatar2.jpg"
  },
   {
      id: 27,
      content: "Where are you",
      timestamp: "2023-02-09T05:29:09.4955229+00:00",
      fromUserName: "admin",
      fromFullName: "James Smith",
      room: "Lobby",
      avatar: "avatar1.jpg"
  },
   {
      id: 28,
      content: "At coffee shop",
      timestamp: "2023-02-09T05:29:15.4955229+00:00",
      fromUserName: "admin2",
      fromFullName: "Maria Nikolaou",
      room: "Lobby",
      avatar: "avatar2.jpg"
  },
    {
      id: 29,
      content: "ohh great",
      timestamp: "2023-02-09T05:29:16.4955229+00:00",
      fromUserName: "admin",
      fromFullName: "James Smith",
      room: "Lobby",
      avatar: "avatar1.jpg"
  }

]
  var { unseenmsg } = useSelector((store) => store.notification);
  const {
    chatting: {
      isGroupChat,
      chatName,
      // user: { pic, name },
      _id,
    },
  } = useSelector((store) => store.chatting);
  const scrolldiv = createRef();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   socket = io(SERVER_POINT);
  //   socket.emit("setup", user);
  //   socket.on("connected", () => {
  //     // setconnectedtosocket(true);
  //   });
  // }, []);
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://192.168.1.56:86/chatHub")
      .build();
    setConnection(newConnection);
    
  }, []);

  // useEffect(() => {
  //   //_id is of selected chat so that user can join same chat room
  //   if (!_id) return;
  //   dispatch(fetchCurrentMessages(_id, token, connection));

  //   currentChattingWith = _id;
  // }, [_id]);
  useEffect(() => {
    const scrollToBottom = (node) => {
      node.scrollTop = node.scrollHeight;
    };
    scrollToBottom(scrolldiv.current);
  });

  // useEffect(() => {
  //   socket.on("message recieved", (newMessage) => {
  //     if (!currentChattingWith || currentChattingWith !== newMessage.chat._id) {
  //       handleNotyfy(newMessage);
  //     } else {
  //       dispatch(sendMessage(newMessage)); messageReceived
  //     }
  //   });
  // }, []);


  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");
          connection.on("newMessage", (newMessage) => {
            dispatch(messageReceived(newMessage)); 

          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);
  
  const handleNotyfy = (newMessage) => {
    dispatch(addUnseenmsg(newMessage));
  };
  return (
    <div className="chattingpage">
      <div className="top-header">
        <div className="user-header">
          <Avatar src={isGroupChat ? "" : "pic"} />
          {/* <p className="user-name">{isGroupChat ? chatName : name}</p> */}
        </div>
        <div>
          <div className="user-fet">
            <SearchIcon />
            <CallIcon />
            <VideoCallIcon />
            <MoreHorizIcon />
          </div>
        </div>
      </div>
      <div ref={scrolldiv} className="live-chat">
        {messages.map((el, index) => (
          <div
            key={index}
            className={
              el.fromUserName != 'admin' ? "rihgtuser-chat" : "leftuser-chat"
            }
          >
            <div
              className={el.fromUserName != "admin" ? "right-avt" : "left-avt"}
            >
              <div className={ChatlogicStyling(el.fromUserName, 'admin')}>
                <p>{el.content}</p>
                <p className="time chat-time">
                  {new Date(el.timestamp).getHours() +
                    ":" +
                    new Date(el.timestamp).getMinutes()}
                </p>
              </div>
{/* 
              {isSameSender(messages, index) ? (
                <Avatar
                  // src={el.sender._id != user._id ? el.sender.pic : user.pic}
                    src={el.fromUserName != "admin2" ? "el.sender.pic" : "user.pic"}
                />
              ) : (
                <div className="blank-div"></div>
              )} */}
            </div>
          </div>
        ))}
      </div>
      <div className="sender-cont">
        <InputContWithEmog id={_id} token={token} connection={connection} />
      </div>
    </div>
  );
};

const ColorButton = styled(Button)(() => ({
  color: "white",
  fontSize: "20px",
  textTransform: "none",
  padding: "12px",
  marginRight: "15px",
  backgroundColor: "#5865f2",
  "&:hover": {
    backgroundColor: "#3a45c3",
  },
}));
function InputContWithEmog({ id, token, connection }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  function handleOnEnter(text) {

    dispatch(
      sendMessageApiAsync(
        id,
        "receiverId",
        text,
         connection      )
    );
  }
  function handleChatClick() {

    dispatch(
      sendMessageApiAsync(
       id,
       "receiverId",
       text,
        connection
      )
    );
    setText("");
  }

  return (
    <>
      <div className="search-cont send-message">
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />
      </div>
      <ColorButton
        onClick={handleChatClick}
        variant="contained"
        endIcon={<SendIcon />}
      ></ColorButton>
    </>
  );
}
