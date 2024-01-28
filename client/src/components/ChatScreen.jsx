import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chat from "./Chat";
import { getConversation } from "../actions/chatActions";

const ChatScreen = () => {
  const dispatch = useDispatch();
  const conversation = useSelector((state) => state.chatReducer.conversation);
  const selectedUser = useSelector(
    (state) => state.chatReducer.selectedConvUser
  );

  useEffect(() => {
    dispatch(getConversation(selectedUser._id));
  }, [dispatch, selectedUser]);

  return (
    <div>
      <Chat senderId={selectedUser._id} messages={conversation?.messages} />
    </div>
  );
};

export default ChatScreen;
