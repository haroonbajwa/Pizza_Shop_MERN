import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../actions/cartActions";

const Cartscreen = () => {
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;
  const subTotal1 = cartItems.reduce((x, item) => x + item.price, 0);

  const dispatch = useDispatch();

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-6 mx-2">
          <h3 className="text-start mx-2">My Cart</h3>
          <div
            className="mb-3 mx-2"
            style={{ width: "90px", borderBottom: "2px solid #dc3545" }}
          ></div>

          {cartItems.map((item) => {
            return (
              <div
                className="flex-container p-2 m-2 shadow"
                // style={{ border: "1px solid #dc3545" }}
              >
                <div className="text-start m-1 w-100">
                  <h2 style={{ fontSize: "20px" }}>
                    {item.name} [{item.variant}]
                  </h2>
                  <p style={{ fontSize: "18px" }}>
                    Price: {item.quantity} * {item.prices[0][item.variant]} ={" "}
                    {item.price}
                  </p>
                  <h1 style={{ display: "inline", fontSize: "18px" }}>
                    Quantity:{" "}
                  </h1>
                  <i
                    className="fa fa-minus text-danger m-2 btn bg-danger text-white"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(
                        addToCart(item, item.quantity - 1, item.variant)
                      );
                    }}
                  ></i>
                  <b className="mx-3" style={{ fontSize: "20px" }}>
                    {item.quantity}
                  </b>
                  <i
                    className="fa fa-plus text-success m-2 btn bg-success text-white"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(
                        addToCart(item, item.quantity + 1, item.variant)
                      );
                    }}
                  ></i>
                </div>
                <div>
                  <img
                    src={item.image}
                    alt="pizza"
                    style={{ height: "80px", width: "80px" }}
                  />
                </div>
                <div>
                  <i
                    className="fa fa-trash text-danger m-2"
                    aria-hidden="true"
                    onClick={() => dispatch(deleteFromCart(item))}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-md-4 text-end mt-4" style={{ marginRight: "30px" }}>
          <h2 style={{ fontSize: "28px" }}>SubTotal: {subTotal1} /-</h2>
          <button className="btn btn-danger">CheckOut</button>
        </div>
        <Link to="/chat">
          <button className="btn btn-info">Let's Chat</button>
        </Link>
      </div>
    </div>
  );
};

export default Cartscreen;
