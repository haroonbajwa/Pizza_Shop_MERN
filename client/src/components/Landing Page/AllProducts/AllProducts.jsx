import React from "react";
import { useSelector } from "react-redux";
import Product from "../../Product";

const AllProducts = () => {
  const pizzasState = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas } = pizzasState;
  return (
    <div className="mx-1">
      <h3 className="text-start">All Products</h3>
      <div
        className="mb-3 mx-1"
        style={{ width: "90px", borderBottom: "2px solid #dc3545" }}
      ></div>

      <div className="row mx-1">
        {pizzas?.map((pizza) => {
          return (
            <div className="col-md-4 col-6 p-1" key={pizza._id}>
              <div>
                {/* <Pizza pizza={pizza} /> */}
                <Product pizza={pizza} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;