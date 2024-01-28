import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import Error from "../Error";
import Loading from "../Loading";
import { getAllPizzas } from "../../actions/pizzaActions";
import { toast } from "react-toastify";
import { convertToBase64 } from "../helperFunctions";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const pizzasState = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, error, loading } = pizzasState;
  const [allPizzas, setAllPizzas] = useState([]);
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

  useEffect(() => {
    if (pizzas) setAllPizzas(pizzas);
  }, [pizzas]);

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

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleDelete = async (productId) => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/api/pizzas/delete/${productId}`)
      .then((res) => {
        dispatch(getAllPizzas());
        toast.info(res.data.message);
      });
  };

  const handleEditModalClose = () => {
    setSelectedItem(null);
    setEditedProduct({
      name: "",
      variants: [],
      prices: [{}],
      category: "",
      image: "",
      description: "",
    });
    setShowEditModal(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    const base64 = await convertToBase64(file);
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      image: base64,
    }));
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    if (selectedItem) {
      // edit selected product
      setShowEditModal(false);
      setSelectedItem(null);
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/api/pizzas/edit/${selectedItem._id}`,
          editedProduct
        )
        .then(() => {
          dispatch(getAllPizzas());
          toast.success("Product updated successfully.");
        });
    } else {
      // add new product
      setShowEditModal(false);
      setSelectedItem(null);
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/pizzas/add`, editedProduct)
        .then((res) => {
          dispatch(getAllPizzas());
          toast.success(res.data.message);
        });
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error.message} />
      ) : (
        <>
          <div className="d-flex justify-content-end m-3">
            <button
              className="btn btn-success"
              onClick={() => setShowEditModal(true)}
            >
              Add Product
            </button>
          </div>
          <table
            className="table table-striped"
            style={{ overflowX: "scroll" }}
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allPizzas?.map((item, index) => (
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

          <Modal show={showEditModal} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {selectedItem ? "Edit Product" : "Add Product"}
              </Modal.Title>
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
                  <div className="d-flex align-items-center">
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

                <Form.Group controlId="productPrices">
                  <Form.Label>Prices</Form.Label>
                  {editedProduct.variants.map((variant, index) => (
                    <div key={index} className="d-flex align-items-center">
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

                {/* <Form.Group controlId="productImage">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    placeholder="Enter product image URL"
                    value={editedProduct.image}
                    onChange={handleInputChange}
                  />
                </Form.Group> */}

                <Form.Group controlId="productImage">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    name="image"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleImageChange}
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

                <Button variant="primary" type="submit" className="mt-2">
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default ManageProducts;
