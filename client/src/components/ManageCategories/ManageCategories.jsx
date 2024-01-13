import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";

const ManageCategories = () => {
  const pizzasState = useSelector((state) => state.getAllPizzasReducer);
  const { categories } = pizzasState;
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [editedCategory, setEditedCategory] = useState({
    name: "",
    variants: [],
    prices: [{}],
    category: "",
    image: "",
    description: "",
  });

  console.log(editedCategory, "edited data");

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

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
    // Add logic to populate the form fields with the selected product data
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle form submission and update the product data
    // Close the modal after successful submission
    setShowEditModal(false);
  };

  return (
    <>
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
                  src={item.image}
                  alt="Product"
                  style={{ maxWidth: "50px", maxHeight: "50px" }}
                />
              </td>
              <td>
                <button
                  className="btn btn-warning m-1"
                  onClick={() => handleEditClick(item)}
                >
                  <FaEdit />
                </button>
                <button className="btn btn-danger m-1">
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
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                placeholder="Enter product image URL"
                value={editedCategory.image}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ManageCategories;
