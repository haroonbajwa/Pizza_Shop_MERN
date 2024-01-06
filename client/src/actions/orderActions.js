import axios from "axios";

// Action to place an order
export const placeOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: "PLACE_ORDER_REQUEST" });

    // Make an API request to place the order
    const response = await axios.post("/api/orders/place-order", orderData);

    console.log(response, "response order action");
    dispatch({
      type: "PLACE_ORDER_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "PLACE_ORDER_FAILURE",
      payload: error.response ? error.response.data : "Something went wrong",
    });
  }
};
