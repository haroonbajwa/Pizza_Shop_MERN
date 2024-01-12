// orderReducer.js
import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAILURE,
} from "../actions/actionsTypes";

const initialState = {
  loading: false,
  order: null,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload.data,
        error: null,
      };

    case PLACE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        order: null,
        error: action.payload,
      };

    case GET_USER_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_USER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userOrders: action.payload,
        error: null,
      };

    case GET_USER_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        userOrders: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
