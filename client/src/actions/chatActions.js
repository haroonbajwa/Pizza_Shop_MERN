// src/redux/actions/chatActions.js

import axios from "axios";
import socket from "../socket";

export const createConversation = () => async (dispatch) => {
  dispatch({ type: "CREATE_CONVERSATION_REQUEST" });

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  try {
    const response = await axios.post(
      `/api/conversations/create/${currentUser._id}`
    );
    console.log(response);
    dispatch({ type: "CREATE_CONVERSATION_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "CREATE_CONVERSATION_FAILED", payload: error });
  }
};

export const getConversation = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/conversations/${userId}`);
    console.log(response);
    dispatch({ type: "GET_CONVERSATION_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage =
  (conversationId, senderId, message) => (dispatch) => {
    socket.emit("sendMessage", { conversationId, senderId, message });
    // You can dispatch an action if needed, e.g., to update the local state
  };

export const getAllMessages = (conversationId) => async (dispatch) => {
  dispatch({ type: "GET_MESSAGES_REQUEST" });

  try {
    const response = await axios.get("/api/messages/all", {
      conversationId,
    });
    console.log(response);
    dispatch({ type: "GET_MESSAGES_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_MESSAGES_FAILED", payload: error });
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });

  try {
    const response = await axios.get("/api/users/all");
    console.log(response);
    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_USERS_FAILED", payload: error });
  }
};

// Other chat-related actions can be added here
