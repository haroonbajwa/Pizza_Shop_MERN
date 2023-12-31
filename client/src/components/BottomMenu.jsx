import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BsBasket2Fill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const BottomMenu = () => {
  const cartState = useSelector((state) => state.cartReducer);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-danger fixed-bottom">
      <div className="container-fluid">
        <NavLink to="/" style={linkStyle} activeStyle={activeLink}>
          <FaHome color="white" size={24} />
          <p style={{ fontSize: "16px", color: "white" }}>Home</p>
        </NavLink>
        <NavLink to="/cart" style={linkStyle} activeStyle={activeLink}>
          <div style={{ position: "relative" }}>
            <BsBasket2Fill color="white" size={24} />
            {cartState.cartItems.length !== 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  backgroundColor: "#ff0000",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                  color: "white",
                }}
              >
                {cartState.cartItems.length}
              </div>
            )}
          </div>
          <p style={{ fontSize: "16px", color: "white" }}>Cart</p>
        </NavLink>
        <NavLink to="/orders" style={linkStyle} activeStyle={activeLink}>
          <FaListAlt color="white" size={24} />
          <p style={{ fontSize: "16px", color: "white" }}>Orders</p>
        </NavLink>
        <NavLink to="/account" style={linkStyle} activeStyle={activeLink}>
          <FaUserCircle color="white" size={24} />
          <p style={{ fontSize: "16px", color: "white" }}>Account</p>
        </NavLink>
      </div>
    </nav>
  );
};

const linkStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "8px",
  textDecoration: "none",
  color: "#282828",
};
const activeLink = {
  backgroundColor: "#007bff",
  color: "#e51818",
};

export default BottomMenu;
