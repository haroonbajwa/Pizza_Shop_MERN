// src/components/Chat.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import socket from "../socket";
import { createConversation, sendMessage } from "../actions/chatActions";
import "./Chat.css";

const Chat = ({ senderId, messages }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const conversation = useSelector((state) => state.chatReducer.conversation);
  console.log(conversation, "conv");

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
      console.log(newMessage, "received msg comp");
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
            <div
              className={`d-flex ${
                msg.sender._id === senderId
                  ? "justify-content-end"
                  : "justify-content-start"
              } mb-4`}
            >
              <div
                className={
                  msg.sender._id === senderId
                    ? "bg-primary text-white p-3 rounded"
                    : "bg-light p-3 rounded"
                }
              >
                <div className="message-text">{msg.message}</div>
                {/* <div className="text-muted">
                  {new Date(msg.timestamp).toLocaleTimeString("en-US")}
                </div> */}
              </div>
            </div>
          );
        })}
      </div>

      <div className="card-footer">
        <div className="input-group">
          <textarea
            name=""
            className="form-control"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="input-group-append">
            <span
              onClick={handleMessageSubmit}
              className="input-group-text bg-primary text-white"
            >
              <i className="fas fa-location-arrow"></i>
            </span>
          </div>
        </div>
      </div>

      {/* <div>
        <button onClick={startConversation} disabled={conversation}>
          {conversation ? "Conversation created" : "Start Conversation"}
        </button>
      </div>

      <div className="card-body msg_card_body">
        {messages?.map((msg) => {
          return (
            <div
              className={`d-flex ${
                msg.sender._id === senderId
                  ? "justify-content-end"
                  : "justify-content-start"
              } mb-4`}
            >
              <div
                className={
                  msg.sender._id === senderId
                    ? "msg_cotainer_send"
                    : "msg_cotainer"
                }
              >
                {msg.message}
              </div>
              <div className="msg_time">
                {new Date(msg.timestamp).toLocaleTimeString("en-US")}
              </div>
            </div>
          );
        })}
      </div>

      <div className="card-footer">
        <div className="input-group">
          <div className="input-group-append">
            <span className="input-group-text attach_btn">
              <i className="fas fa-paperclip"></i>
            </span>
          </div>
          <textarea
            name=""
            className="form-control type_msg"
            placeholder="Type your message..."
          ></textarea>
          <div className="input-group-append">
            <span className="input-group-text send_btn">
              <i className="fas fa-location-arrow"></i>
            </span>
          </div>
        </div>
      </div> */}

      {/* {conversation && (
        <div>
          <div>
            {messages?.map((msg) => (
              <div key={msg._id}>
                <strong>{msg.sender.name}:</strong> {msg.message}
              </div>
            ))}
          </div>
          <form onSubmit={handleMessageSubmit}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )} */}
    </div>
  );
};

export default Chat;
