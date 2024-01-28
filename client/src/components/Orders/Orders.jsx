import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Card, Badge } from "react-bootstrap";
import { getUserOrders } from "../../actions/orderActions";
import { getAllConversations } from "../../actions/chatActions";

import Error from "../Error";
import Loading from "../Loading";
import ConversationsList from "../ConversationsList";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  const { loading, userOrders, error } = useSelector(
    (state) => state.orderReducer
  );

  const { allConversations } = useSelector((state) => state.chatReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders(currentUser?._id));
    dispatch(getAllConversations());
  }, [dispatch, currentUser]);

  const getStatusVariant = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "processing":
        return "primary";
      case "shipped":
        return "info";
      case "delivered":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

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
                  <Badge
                    bg={getStatusVariant(order.status)}
                    className="mb-2 p-2 ml-1"
                  >
                    {order.status}
                  </Badge>
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
