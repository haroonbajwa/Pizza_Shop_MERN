import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Homescreen from "./components/Homescreen";
import Cartscreen from "./components/Cartscreen";
import ChatScreen from "./components/ChatScreen";
import Registerscreen from "./components/Registerscreen";
import Loginscreen from "./components/Loginscreen";
import BottomMenu from "./components/BottomMenu";
import MyAccount from "./components/MyAccount/MyAccount";
import Orders from "./components/Orders/Orders";
import ManageProducts from "./components/ManageProducts/ManageProducts";
import ManageCategories from "./components/ManageCategories/ManageCategories";

const PrivateRoute = ({ element }) => {
  // Check if the current user is available in localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return currentUser ? (
    // If the current user is available, render the requested element
    element
  ) : (
    // If the current user is not available,redirect to login
    <Navigate to="/login" />
  );
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <div style={{ marginBottom: "100px" }}>
          <Routes>
            <Route exact path="/" element={<Homescreen />} />
            <Route exact path="/register" element={<Registerscreen />} />
            <Route exact path="/login" element={<Loginscreen />} />
            <Route exact path="/cart" element={<Cartscreen />} />
            <Route
              exact
              path="/chat"
              element={<PrivateRoute element={<ChatScreen />} />}
            />
            <Route
              exact
              path="/orders"
              element={<PrivateRoute element={<Orders />} />}
            />
            <Route
              exact
              path="/account"
              element={<PrivateRoute element={<MyAccount />} />}
            />

            <Route
              exact
              path="/manage-products"
              element={<PrivateRoute element={<ManageProducts />} />}
            />
            <Route
              exact
              path="/manage-categories"
              element={<PrivateRoute element={<ManageCategories />} />}
            />
          </Routes>
        </div>
        <BottomMenu />
      </BrowserRouter>
    </div>
  );
}

export default App;
