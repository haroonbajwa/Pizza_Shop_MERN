import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";

const ManageProducts = () => {
  const pizzasState = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas } = pizzasState;
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [newVariant, setNewVariant] = useState("");
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    variants: [],
    prices: [{}],
    category: "",
    image: "",
    description: "",
  });

  console.log(editedProduct, "edited data");

  useEffect(() => {
    // Set the form fields based on the selectedItem
    if (selectedItem)
      setEditedProduct({
        name: selectedItem.name,
        variants: selectedItem.variants || [],
        prices: selectedItem.prices || [{}],
        category: selectedItem.category || "",
        image: selectedItem.image || "",
        description: selectedItem.description || "",
      });
  }, [selectedItem]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // add/remove variants functions
  const handleAddVariant = () => {
    if (
      newVariant.trim() !== "" &&
      !editedProduct.variants.includes(newVariant.trim())
    ) {
      handleInputChange({
        target: {
          name: "variants",
          value: [...editedProduct.variants, newVariant.trim()],
        },
      });
      setNewVariant("");
    }
  };
  const handlePriceChange = (variant, value) => {
    setEditedProduct((prevProduct) => {
      const updatedPrices = [...prevProduct.prices];
      updatedPrices[0][variant] = Number(value);

      return {
        ...prevProduct,
        prices: updatedPrices,
      };
    });
  };
  const handleRemoveVariant = (variantToRemove) => {
    handleInputChange({
      target: {
        name: "variants",
        value: editedProduct.variants.filter(
          (variant) => variant !== variantToRemove
        ),
      },
    });
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
          {pizzas.map((item, index) => (
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
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditFormSubmit}>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter product name"
                value={editedProduct.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="productVariants">
              <Form.Label>Variants</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Enter new variant"
                  value={newVariant}
                  onChange={(e) => setNewVariant(e.target.value)}
                />
                <Button
                  variant="success"
                  className="ml-2"
                  onClick={handleAddVariant}
                >
                  Add
                </Button>
              </div>
            </Form.Group>
            {/* <Form.Group controlId="productVariants">
              <Form.Label>Variants</Form.Label>
              <Form.Control
                type="text"
                name="variants"
                placeholder="Enter product variants (comma-separated)"
                value={editedProduct.variants.join(", ")}
                onChange={handleInputChange}
              />
            </Form.Group> */}

            <Form.Group controlId="productPrices">
              <Form.Label>Prices</Form.Label>
              {editedProduct.variants.map((variant, index) => (
                <div key={index} className="d-flex">
                  <div className="w-40 pr-2">
                    <Form.Control
                      type="text"
                      name={`prices[${index}].size`}
                      placeholder="Size"
                      value={variant || ""}
                      onChange={(e) =>
                        handleInputChange({
                          target: {
                            name: `prices[${index}].size`,
                            value: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="w-40 pl-2">
                    <Form.Control
                      type="number"
                      name={`editedProduct.prices[0][${variant}]`}
                      placeholder="Amount"
                      value={editedProduct.prices[0][variant] || ""}
                      onChange={(e) =>
                        handlePriceChange(variant, e.target.value)
                      }
                    />
                  </div>
                  <button
                    key={index}
                    className="btn btn-danger"
                    onClick={() => {
                      handleRemoveVariant(variant);
                      setEditedProduct((prev) => {
                        delete prev.prices[0][variant];
                        return prev;
                      });
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
            </Form.Group>

            <Form.Group controlId="productCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                placeholder="Enter product category"
                value={editedProduct.category}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="productImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                placeholder="Enter product image URL"
                value={editedProduct.image}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Enter product description"
                value={editedProduct.description}
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

export default ManageProducts;
