// src/components/Chat.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import socket from "../socket";
import { createConversation, sendMessage } from "../actions/chatActions";
import "./Chat.css";

const Chat = ({ senderId, messages }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const conversation = useSelector((state) => state.chatReducer.conversation);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      dispatch(sendMessage(conversation._id, senderId, message));
      setMessage("");
    }
  };

  useEffect(() => {
    // Join the admin room when the component mounts
    if (conversation)
      socket.emit("joinAdmin", { conversationId: conversation._id });

    // check if conversation already created
  }, [conversation]);

  useEffect(() => {
    // Handle incoming messages from the admin
    socket.on("receiveMessage", (newMessage) => {
      dispatch({ type: "RECEIVE_MESSAGE", payload: newMessage });
    });

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.off("receiveMessage");
    };
  }, [dispatch]);

  const startConversation = () => {
    dispatch(createConversation());
  };

  return (
    <div>
      <div>
        <button onClick={startConversation} disabled={conversation}>
          {conversation ? "Conversation created" : "Start Conversation"}
        </button>
      </div>
      <div className="card-body">
        {messages?.map((msg) => {
          return (
            <>
              <div
                className={`d-flex ${
                  msg.sender?._id === senderId
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={
                    msg.sender?._id === senderId
                      ? "p-3 text-white msg_container_send"
                      : "p-3 text-white msg_container"
                  }
                >
                  <div className="message-text">{msg.message}</div>
                </div>
              </div>
              <div
                className={`text-muted mb-4 ${
                  msg.sender?._id === senderId ? "text-end" : "text-start"
                }`}
                style={{ fontSize: "12px" }}
              >
                {new Date(msg.timestamp).toLocaleTimeString("en-US")}
              </div>
            </>
          );
        })}
      </div>

      {conversation && (
        <div className="card-footer">
          <div className="input-group align-items-center">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></input>
            <div className=" align-items-center">
              <span
                onClick={handleMessageSubmit}
                className="input-group-text btn bg-primary text-white mt-2"
              >
                <i className="fas fa-location-arrow"></i>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
