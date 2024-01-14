import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../actions/cartActions";
import { placeOrder } from "../actions/orderActions";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import Error from "./Error";
import Loading from "./Loading";

const Cartscreen = () => {
  const cartState = useSelector((state) => state.cartReducer);
  const { loading, order, error } = useSelector((state) => state.orderReducer);
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  const cartItems = cartState.cartItems;
  const subTotal1 = cartItems.reduce((x, item) => x + item.price, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const cartData = cartItems

  const handleOrderPlace = () => {
    const orderData = {
      user: currentUser._id,
      items: cartItems,
      totalAmount: subTotal1,
    };

    // Dispatch the placeOrder action
    dispatch(placeOrder(orderData)).then((res) => {
      toast.success(res.message);
    });
  };

  // if cart is empty
  if (cartItems.length <= 0) {
    return (
      <div className="d-flex h-100 justify-content-center align-items-center">
        <div className="text-center mt-5">
          <MdOutlineRemoveShoppingCart size={56} />
          <h3>Cart Empty</h3>
          <button className="btn btn-danger mt-3" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error.message} />
      ) : (
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
                      Qty:{" "}
                    </h1>
                    <i
                      className="fa fa-minus text-danger m-1 btn bg-danger text-white"
                      aria-hidden="true"
                      onClick={() => {
                        dispatch(
                          addToCart(item, item.quantity - 1, item.variant)
                        );
                      }}
                    ></i>
                    <b className="mx-2" style={{ fontSize: "20px" }}>
                      {item.quantity}
                    </b>
                    <i
                      className="fa fa-plus text-success m-1 btn bg-success text-white"
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
          <div
            className="col-md-4 text-end mt-4"
            style={{ marginRight: "30px" }}
          >
            <h2 style={{ fontSize: "28px" }}>SubTotal: {subTotal1} /-</h2>
            <button className="btn btn-danger" onClick={handleOrderPlace}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cartscreen;
