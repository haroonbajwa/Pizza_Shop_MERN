// orderReducer.js
import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
} from "../actions/actionsTypes";

const initialState = {
  loading: false,
  order: null,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  console.log(action.payload, "response order reducer");
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

    default:
      return state;
  }
};

export default orderReducer;
