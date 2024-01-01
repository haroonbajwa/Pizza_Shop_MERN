import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/userActions";
import placeholderImage from "../../assets/userAvatar.jpg";
import { FaCamera } from "react-icons/fa";

const MyAccount = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;

  const [isEditing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(currentUser);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Handle the file upload logic here
    // For now, just update the image URL
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      image: URL.createObjectURL(file),
    }));
  };

  return (
    <div className="container mt-4">
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
              <label htmlFor="name">Name:</label>
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
              <button className="btn btn-success ml-2" onClick={handleUpdate}>
                Update
              </button>
              <button className="btn btn-secondary ml-2" onClick={handleCancel}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;