import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";
import Error from "./Error";
import Loading from "./Loading";
import Success from "./Success";
import { useNavigate } from "react-router-dom";

const Loginscreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginState = useSelector((state) => state.loginUserReducer);
  const { error, loading, success } = loginState;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  const login = () => {
    if (email === "" && password === "") {
      alert("Incorrect email or password!");
    } else {
      const user = {
        email,
        password,
      };
      dispatch(loginUser(user));
    }
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-5 mt-5 text-start shadow p-3 mb-5 bg-white rounded">
          {loading && <Loading />}
          {success && <Success success="USer Logged In Successfully!" />}
          {error && <Error error="Invalid Credentials!" />}

          <h2 className="text-center m-3" style={{ fontSize: "35px" }}>
            Login
          </h2>
          <div>
            <input
              type="text"
              placeholder="Email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={login} className="btn btn-danger my-3">
              LOGIN
            </button>
            <br />
            <label onClick={() => navigate("/register")}>
              Click here to Register
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginscreen;
