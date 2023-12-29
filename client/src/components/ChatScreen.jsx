import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chat from "./Chat";
import { getConversation } from "../actions/chatActions";

const ChatScreen = () => {
  const dispatch = useDispatch();
  const conversation = useSelector((state) => state.chatReducer.conversation);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    dispatch(getConversation(currentUser?._id));
  }, []);

  return (
    <div>
      <Chat senderId={currentUser._id} messages={conversation?.messages} />
    </div>
  );
};

export default ChatScreen;
