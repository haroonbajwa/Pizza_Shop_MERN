import axios from "axios";
import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAILURE,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILURE,
} from "../actions/actionsTypes";

// Action to place an order
export const placeOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: PLACE_ORDER_REQUEST });

    // Make an API request to place the order
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/orders/place-order`,
      orderData
    );
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
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/orders/user-orders/${userId}`
    );
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

export const updateOrder = (orderId, orderStatus) => async (dispatch) => {
  try {
    console.log(orderId, orderStatus, "call");
    // Make an API request to update the order
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/orders/update/${orderId}`,
      { orderStatus }
    );
    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAILURE,
      payload: error.response ? error.response.data : "Something went wrong",
    });
  }
};
