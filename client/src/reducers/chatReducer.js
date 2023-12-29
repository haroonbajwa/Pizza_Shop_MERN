// src/redux/reducers/chatReducer.js

const initialState = {
  allMessages: [],
  allUsers: [],
  conversation: [],
  // Other relevant state properties can be added here
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CONVERSATION_SUCCESS":
      return {
        ...state,
        conversation: action.payload,
      };

    case "RECEIVE_MESSAGE":
      console.log(action, "received msg");
      return {
        ...state,
        conversation: {
          ...state.conversation,
          messages: [...state.conversation.messages, action.payload],
        },
        // allMessages: [...state.allMessages, action.payload],
      };
    case "GET_MESSAGES_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET_MESSAGES_SUCCESS":
      return {
        loading: false,
        allMessages: action.payload,
      };
    case "GET_MESSAGES_FAILED":
      return {
        error: action.payload,
        loading: false,
      };

    // conversation
    case "CREATE_CONVERSATION_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "CREATE_CONVERSATION_SUCCESS":
      return {
        loading: false,
        conversation: action.payload,
      };
    case "CREATE_CONVERSATION_FAILED":
      return {
        error: action.payload,
        loading: false,
      };

    // users
    case "GET_USERS_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET_USERS_SUCCESS":
      return {
        loading: false,
        allUsers: action.payload,
      };
    case "GET_USERS_FAILED":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default chatReducer;
