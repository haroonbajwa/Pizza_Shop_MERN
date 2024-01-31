import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { Card, Badge, Form } from "react-bootstrap";
import { getUserOrders, updateOrder } from "../../actions/orderActions";
import { getAllConversations } from "../../actions/chatActions";

import Error from "../Error";
import Loading from "../Loading";
import ConversationsList from "../ConversationsList";
import { toast } from "react-toastify";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  const { loading, userOrders, error } = useSelector(
    (state) => state.orderReducer
  );
  const { allConversations } = useSelector((state) => state.chatReducer);

  const [selectedStatuses, setSelectedStatuses] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders(currentUser?._id));
    dispatch(getAllConversations());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStatusVariant = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "processing":
        return "primary";
      case "delivered":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };
  const statusOptions = ["pending", "processing", "delivered", "cancelled"];

  // Handle the status change for a specific item
  const handleStatusChange = (orderId, event) => {
    const newSelectedStatuses = { ...selectedStatuses };
    newSelectedStatuses[orderId] = event.target.value;
    setSelectedStatuses(newSelectedStatuses);
  };

  // update status call
  const handleUpdateStatus = (orderId) => {
    dispatch(updateOrder(orderId, selectedStatuses[orderId])).then((res) => {
      console.log(res, "res after update");
      if (res.data) toast.success(res.message);
    });
  };

  console.log(selectedStatuses);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error.message} />
      ) : (
        <>
          {currentUser.isAdmin ? (
            <ConversationsList conversations={allConversations} />
          ) : (
            <div className="d-flex justify-content-end m-2">
              <Link
                to="/chat"
                className="d-flex justify-content-end text-decoration-none"
              >
                <button className="btn btn-info">
                  <IoChatboxEllipsesOutline size={22} />
                  <span>Let's Chat</span>
                </button>
              </Link>
            </div>
          )}
          <div style={{ paddingLeft: "16px" }}>
            <h3 style={{ fontSize: "20px" }} className="my-3 mx-1 text-start">
              Orders
            </h3>
            <div
              className="mb-3 mx-1"
              style={{ width: "90px", borderBottom: "2px solid #dc3545" }}
            ></div>
          </div>
          {userOrders?.map((order) => (
            <Card key={order._id} className="mb-4">
              <Card.Body>
                <h3 style={{ fontSize: "20px" }}>{order.user.name}</h3>
                <div className="d-flex align-items-center justify-content-between">
                  <Card.Title style={{ fontSize: "15px" }}>
                    Order {order._id}
                  </Card.Title>
                  {currentUser.isAdmin ? (
                    <div className="d-flex align-items-center">
                      <Form.Control
                        as="select"
                        value={
                          selectedStatuses[order._id]
                            ? selectedStatuses[order._id]
                            : order.status
                        }
                        onChange={(event) =>
                          handleStatusChange(order._id, event)
                        }
                        className="p-2 ml-1"
                        style={{ width: "110px" }}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </Form.Control>
                      <button
                        className="btn btn-success ml-2"
                        onClick={() => handleUpdateStatus(order._id)}
                      >
                        <FaCheck />
                      </button>
                    </div>
                  ) : (
                    <Badge
                      bg={getStatusVariant(order.status)}
                      className="mb-2 p-2 ml-1"
                    >
                      {order.status}
                    </Badge>
                  )}
                  {/* <Badge
                    bg={getStatusVariant(order.status)}
                    className="mb-2 p-2 ml-1"
                  >
                    {order.status}
                  </Badge> */}
                </div>
                <div className="d-flex flex-wrap">
                  {order.products.map((product) => (
                    <Badge key={product._id} variant="info" className="m-1">
                      {product.name} ({product.quantity})
                    </Badge>
                  ))}
                </div>
                <p className="mt-3 text-end">
                  Total Amount: ${order.totalAmount}
                </p>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default Orders;
