import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../actions/pizzaActions";
import { getAllMessages, getAllUsers } from "../actions/chatActions";
import Error from "./Error";
import Loading from "./Loading";
import Pizza from "./Pizza";

const Homescreen = () => {
  const dispatch = useDispatch();

  const pizzasState = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, error, loading } = pizzasState;

  useEffect(() => {
    dispatch(getAllPizzas());
    dispatch(getAllUsers());
    // dispatch(getAllMessages());
  }, [dispatch]);

  return (
    <div className="row">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error.message} />
      ) : (
        <>
          {pizzas?.map((pizza) => {
            return (
              <div className="col-md-4" key={pizza._id}>
                <div>
                  <Pizza pizza={pizza} />
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Homescreen;
