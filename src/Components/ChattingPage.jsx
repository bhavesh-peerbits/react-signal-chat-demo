import styled from "@emotion/styled";
import CallIcon from "@mui/icons-material/Call";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { Avatar, Button, IconButton, Menu, MenuItem } from "@mui/material";
import React, { createRef, useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import { useDispatch, useSelector } from "react-redux";
import { ChatlogicStyling, isSameSender } from "./ChatstyleLogic";
import { sendMessageApi } from "./Redux/Chatting/action";
import { addUnseenmsg } from "./Redux/Notification/action";
import { HubConnectionBuilder } from "@microsoft/signalr";
import {
  deleteGroupMessageAsync,
  messageReceived,
  sendMessageApiAsync,
} from "./Redux/Chatting/ChattingNew/action1";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UserImg from "../Components/Auth/profileimg.png";

export const ChattingPage = () => {
  const [connection, setConnection] = useState(null);
  const [messageObj, setMessageObj] = useState();
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);
  const { user, token } = useSelector((store) => store.user);
  // const { messages } = useSelector((store) => store.chatting);
  const { messages, roomData, chatting } = useSelector(
    (store) => store.chattingOne
  );

  const UserID = localStorage.getItem("UserID");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, el) => {
    setAnchorEl(event.currentTarget);
    setMessageObj(el);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteGroupMessage = (el) => {
    dispatch(
      deleteGroupMessageAsync(messageObj.messageID, messageObj.senderID)
    );
    setAnchorEl(null);
  };

  var { unseenmsg } = useSelector((store) => store.notification);
  // const {
  //   chatting: {
  //     isGroupChat,
  //     chatName,
  //     // user: { pic, name },
  //     _id,
  //   },
  // } = useSelector((store) => store.chatting);
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
      .withUrl("http://192.168.1.56:81/chatHub")
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
          <Avatar />
          <p className="user-name">{roomData?.roomName || ""}</p>
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
        {chatting?.length > 0
          ? chatting?.map((el, index) => (
              <>
                <div
                  key={index}
                  className={
                    el.senderID != UserID ? "rihgtuser-chat" : "leftuser-chat"
                  }
                >
                  <div
                    className={el.senderID != UserID ? "right-avt" : "left-avt"}
                  >
                    {el.senderID === UserID ? (
                      <div>
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? "long-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={(e) => handleClick(e, el)}
                          sx={{ mr: "-20px" }}
                        >
                          <MoreVertIcon />
                        </IconButton>

                        <Menu
                          id="long-menu"
                          MenuListProps={{
                            "aria-labelledby": "long-button",
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          onClick={handleDeleteGroupMessage}
                        >
                          <MenuItem
                            key={"delete"}
                            // onClick={() => {
                            //   handleDeleteGroupMessage(el);
                            // }}
                          >
                            Delete
                          </MenuItem>
                        </Menu>
                      </div>
                    ) : null}

                    <div className={ChatlogicStyling(el.senderID, UserID)}>
                      <p>{el.messageString}</p>
                      <p className="time chat-time">
                        {new Date(el.timestamp).getHours() +
                          ":" +
                          new Date(el.timestamp).getMinutes()}
                      </p>
                    </div>
                    <Avatar
                      src={el.senderID != UserID ? "" : UserImg}
                      // src={
                      //   el.fromUserName != "admin2"
                      //     ? "el.sender.pic"
                      //     : "user.pic"
                      // }
                    />
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
              </>
            ))
          : null}
      </div>
      <div className="sender-cont">
        <InputContWithEmog
          senderID={roomData.SenderID}
          MBID={roomData.MBID}
          connection={connection}
        />
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
function InputContWithEmog({ senderID, MBID, connection }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  function handleOnEnter(text) {
    dispatch(sendMessageApiAsync(senderID, MBID, text, connection));
  }
  function handleChatClick() {
    dispatch(sendMessageApiAsync(senderID, MBID, text, connection));
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
