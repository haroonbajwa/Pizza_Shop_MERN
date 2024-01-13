import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { BsBasket2Fill } from "react-icons/bs";

import { addToCart } from "../actions/cartActions";

import { Modal, Button } from "react-bootstrap";

const Product = ({ pizza }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState("small");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addToCartFunc = () => {
    dispatch(addToCart(pizza, quantity, variant));
  };

  return (
    <div className="shadow-lg bg-white rounded">
      <div onClick={handleShow} style={{ cursor: "pointer" }}>
        <img
          src={pizza.image}
          alt="pizza"
          className="img-fluid"
          style={{ width: "130px", height: "130px" }}
        />
        <h1 style={{ fontSize: "16px" }}>{pizza.name}</h1>
      </div>

      <div className="flex-container mt-3">
        <div className="w-100 m-1">
          <select
            className="form-control text-center"
            style={{ fontSize: "12px" }}
            value={variant}
            onChange={(e) => {
              setVariant(e.target.value);
            }}
          >
            {pizza.variants.map((option, index) => {
              return (
                <option value={option} key={index}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-100 m-1">
          <select
            className="form-control text-center"
            style={{ fontSize: "12px" }}
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          >
            {[...Array(10).keys()].map((number, index) => {
              return (
                <option value={index + 1} key={index}>
                  {index + 1}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="flex-container py-3 align-items-center">
        <div className="m-1 w-100">
          <p className="m-0" style={{ fontSize: "16px" }}>
            {pizza.prices[0][variant] * quantity} Rs/-
          </p>
        </div>
        <div className="m-1 w-100">
          <span
            className="p-2 bg-danger text-white"
            style={{ borderRadius: "50%" }}
          >
            <BsBasket2Fill onClick={addToCartFunc} />
          </span>
        </div>
      </div>

      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{pizza.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <img
              src={pizza.image}
              alt="pizza"
              className="img-fluid rounded mx-auto d-block"
              style={{ height: "300px" }}
            />
            <h5 className="mt-3">Description</h5>
            <p>{pizza.description}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Product;
