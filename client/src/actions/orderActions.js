import axios from "axios";
import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAILURE,
} from "../actions/actionsTypes";

// Action to place an order
export const placeOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: PLACE_ORDER_REQUEST });

    // Make an API request to place the order
    const response = await axios.post("/api/orders/place-order", orderData);
    dispatch({
      type: PLACE_ORDER_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAILURE,
      payload: error.response ? error.response.data : "Something went wrong",
    });
  }
};

// Action to place an order
export const getUserOrders = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_ORDERS_REQUEST });

    // Make an API request to place the order
    const response = await axios.get(`/api/orders/user-orders/${userId}`);
    dispatch({
      type: GET_USER_ORDERS_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: GET_USER_ORDERS_FAILURE,
      payload: error.response ? error.response.data : "Something went wrong",
    });
  }
};
