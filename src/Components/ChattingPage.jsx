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



export const ChattingPage = () => {
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState<([]);
  const latestChat = useRef(null);
  const { user, token } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.chatting);
  var { unseenmsg } = useSelector((store) => store.notification);
  const {
    chatting: {
      isGroupChat,
      chatName,
      user: { pic, name },
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
  //       dispatch(sendMessage(newMessage));
  //     }
  //   });
  // }, []);
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");
          connection.on("ReceiveMessage", (message) => {
            const updatedChat = [...latestChat.current];
            updatedChat.push(message);
            setChat(updatedChat);
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
          <Avatar src={isGroupChat ? "" : pic} />
          <p className="user-name">{isGroupChat ? chatName : name}</p>
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
              el.sender._id != user._id ? "rihgtuser-chat" : "leftuser-chat"
            }
          >
            <div
              className={el.sender._id != user._id ? "right-avt" : "left-avt"}
            >
              <div className={ChatlogicStyling(el.sender._id, user._id)}>
                <p>{el.content}</p>
                <p className="time chat-time">
                  {new Date(el.createdAt).getHours() +
                    ":" +
                    new Date(el.createdAt).getMinutes()}
                </p>
              </div>

              {isSameSender(messages, index) ? (
                <Avatar
                  src={el.sender._id != user._id ? el.sender.pic : user.pic}
                />
              ) : (
                <div className="blank-div"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="sender-cont">
        <InputContWithEmog id={_id} token={token} socket={connection} />
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
function InputContWithEmog({ id, token, socket }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  function handleOnEnter(text) {
    dispatch(
      sendMessageApi(
        {
          content: text,
          chatId: id,
        },
        token,
        socket
      )
    );
  }
  function handleChatClick() {
    dispatch(
      sendMessageApi(
        {
          content: text,
          chatId: id,
        },
        token,
        socket
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
