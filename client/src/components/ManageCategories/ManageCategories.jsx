import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import { getAllCategories } from "../../actions/pizzaActions";
import { toast } from "react-toastify";
import { objectToFormData } from "../helperFunctions";

const ManageCategories = () => {
  const dispatch = useDispatch();
  const pizzasState = useSelector((state) => state.getAllPizzasReducer);
  const { categories } = pizzasState;
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [editedCategory, setEditedCategory] = useState({
    name: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    // Set the form fields based on the selectedItem
    if (selectedItem)
      setEditedCategory({
        name: selectedItem.name,
        image: selectedItem.image || "",
        description: selectedItem.description || "",
      });
  }, [selectedItem]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setEditedCategory((prevUser) => ({
      ...prevUser,
      image: file,
    }));
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setSelectedItem(null);
    setEditedCategory({
      name: "",
      image: "",
      description: "",
    });
    setShowEditModal(false);
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    const formData = objectToFormData(editedCategory);
    setShowEditModal(false);
    if (selectedItem) {
      // edit selected category
      setSelectedItem(null);
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/api/pizzas/edit-category/${selectedItem._id}`,
          formData
        )
        .then(() => {
          dispatch(getAllCategories());
          toast.success("Category updated successfully.");
        });
    } else {
      // add new category
      setSelectedItem(null);
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/api/pizzas/add-category`,
          formData
        )
        .then((res) => {
          dispatch(getAllCategories());
          toast.success(res.data.message);
        });
    }
  };

  const handleDelete = async (categoryId) => {
    await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/api/pizzas/delete-category/${categoryId}`
      )
      .then((res) => {
        dispatch(getAllCategories());
        toast.info(res.data.message);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-end m-3">
        <button
          className="btn btn-success"
          onClick={() => setShowEditModal(true)}
        >
          Add Category
        </button>
      </div>
      <table className="table table-striped" style={{ overflowX: "scroll" }}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((item, index) => (
            <tr key={item._id}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/uploads/${item.image}`}
                  alt="Product"
                  style={{ maxWidth: "50px", maxHeight: "50px" }}
                />
              </td>
              <td>
                <button
                  className="btn btn-warning m-1"
                  onClick={() => handleEdit(item)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-danger m-1"
                  onClick={() => handleDelete(item._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditFormSubmit}>
            <Form.Group controlId="productName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Category name"
                value={editedCategory.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Enter product description"
                value={editedCategory.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="productImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                name="image"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ManageCategories;
