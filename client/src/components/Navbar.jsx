import React from "react";
// import { Dropdown, DropdownButton } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "../actions/userActions";
import { MdFastfood } from "react-icons/md";
import { Navigate } from "react-router-dom";

const Navbar = () => {
  // const cartState = useSelector((state) => state.cartReducer);
  // const userState = useSelector((state) => state.loginUserReducer);
  // const { currentUser } = userState;

  // const dispatch = useDispatch();

  return (
    <div>
      <a className="navbar-brand" href="/">
        <MdFastfood color="#dc3545" size={90} />
        <h1>Food Way</h1>
      </a>
    </div>
    // <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-body rounded">
    //   <a className="navbar-brand" href="/">
    //     Food Way
    //   </a>
    //   <button
    //     className="navbar-toggler"
    //     type="button"
    //     data-toggle="collapse"
    //     data-target="#navbarNav"
    //     aria-controls="navbarNav"
    //     aria-expanded="false"
    //     aria-label="Toggle navigation"
    //   >
    //     <span className="navbar-toggler-icon"></span>
    //   </button>
    //   <div className="collapse navbar-collapse" id="navbarNav">
    //     <ul className="navbar-nav ms-auto">
    //       {currentUser ? (
    //         <DropdownButton id="dropdown-basic-button" title={currentUser.name}>
    //           <Dropdown.Item href="/">Orders</Dropdown.Item>
    //           <Dropdown.Item href="/" onClick={() => dispatch(logoutUser())}>
    //             Logout
    //           </Dropdown.Item>
    //         </DropdownButton>
    //       ) : (
    //         <li className="nav-item">
    //           <a className="nav-link" href="/login">
    //             Login
    //           </a>
    //         </li>
    //       )}

    //       <li className="nav-item">
    //         <a className="nav-link" href="/cart">
    //           Cart {cartState.cartItems.length}
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
};

export default Navbar;
