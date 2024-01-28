import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas, getAllCategories } from "../actions/pizzaActions";
import { getAllUsers } from "../actions/chatActions";
import Error from "./Error";
import Loading from "./Loading";
import Categories from "./Landing Page/Categories/Categories";
import AllProducts from "./Landing Page/AllProducts/AllProducts";

const Homescreen = () => {
  const dispatch = useDispatch();

  const pizzasState = useSelector((state) => state.getAllPizzasReducer);
  const { error, loading } = pizzasState;

  useEffect(() => {
    dispatch(getAllPizzas());
    dispatch(getAllCategories());
    dispatch(getAllUsers());
  }, [dispatch]);

  console.log(process.env.REACT_APP_BASE_URL, "url");
  return (
    <div className="row">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error.message} />
      ) : (
        <>
          {/* main section */}
          <div className="my-5">
            <h1 style={{ fontSize: "32px" }}>
              Order Your <span className="text-danger">Favorites</span>
            </h1>
            <h3>Anytime, Anywhere</h3>
          </div>

          {/* Categories section */}
          <Categories />
          <AllProducts />
        </>
      )}
      {/* <BottomMenu /> */}
    </div>
  );
};

export default Homescreen;
