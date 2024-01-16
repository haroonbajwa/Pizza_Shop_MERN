import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../actions/userActions";
import placeholderImage from "../../assets/userAvatar.jpg";
import { FaCamera } from "react-icons/fa";
import { convertToBase64 } from "../helperFunctions";

const MyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;

  const userData = {
    ...currentUser,
    Image: `data:image/png;base64,${currentUser.image}`,
  };
  const [isEditing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(userData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    dispatch(updateUser(updatedUser));
    setEditing(false);
  };

  const handleCancel = () => {
    setUpdatedUser(currentUser);
    setEditing(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    const base64 = await convertToBase64(file);
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      image: base64,
    }));
  };

  const handleLogout = (e) => {
    navigate("/login");
    localStorage.clear();
    dispatch({ type: "USER_LOGOUT" });
  };

  return (
    <div className="container mt-4">
      {currentUser.isAdmin && (
        <div className="row card mb-3">
          <h3 className="my-2" style={{ fontSize: "20px" }}>
            Manage Records
          </h3>
          <menu>
            <button
              className="btn btn-danger mx-2"
              onClick={() => navigate("/manage-products")}
            >
              Products
            </button>
            <button
              className="btn btn-danger mx-2"
              onClick={() => navigate("/manage-categories")}
            >
              Categories
            </button>
          </menu>
        </div>
      )}
      <div className="row">
        <div className="col-md-4 col-sm-12 mb-3">
          <label htmlFor="upload-image">
            <img
              src={updatedUser.image || placeholderImage}
              alt="User"
              className="img-fluid rounded-circle"
              style={{ cursor: "pointer" }}
              width={200}
            />
            {isEditing && (
              <div>
                <FaCamera size={30} />
                <input
                  type="file"
                  id="upload-image"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>
            )}
          </label>
        </div>
        <div className="col-md-8 col-sm-12">
          <h2>{isEditing ? "Edit Mode" : currentUser.name}</h2>
          <p>{currentUser.email}</p>

          {isEditing && (
            <div className="form-group">
              <label htmlFor="name" className="text-start">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={updatedUser.name}
                onChange={handleInputChange}
              />
            </div>
          )}

          {!isEditing && (
            <button
              className="btn btn-primary"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          )}

          {isEditing && (
            <>
              <button className="btn btn-success m-2" onClick={handleUpdate}>
                Update
              </button>
              <button className="btn btn-secondary m-2" onClick={handleCancel}>
                Cancel
              </button>
            </>
          )}
          <div>
            <button className="btn btn-danger mt-2" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
