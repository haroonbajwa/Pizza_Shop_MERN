import axios from "axios";

export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: "GET_PIZZAS_REQUEST" });

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/pizzas/pizzas`
    );
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_PIZZAS_FAILED", payload: error });
  }
};

export const getAllCategories = () => async (dispatch) => {
  dispatch({ type: "GET_CATEGORIES_REQUEST" });

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/pizzas/categories`
    );
    dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_CATEGORIES_FAILED", payload: error });
  }
};
