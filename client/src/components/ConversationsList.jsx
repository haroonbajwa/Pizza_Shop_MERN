import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConversationsList = ({ conversations }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openConversation = (user) => {
    dispatch({ type: "SELECT_CONVERSATION_USER", payload: user });
    navigate("/chat");
  };
  return (
    <Card>
      <Card.Body>
        <h3 style={{ fontSize: "20px" }} className="my-3 mx-1 text-start">
          Conversations
        </h3>
        <div
          className="mb-3 mx-1"
          style={{ width: "90px", borderBottom: "2px solid #dc3545" }}
        ></div>
        {conversations?.length === 0 ? (
          <div>There is no conversation yet.</div>
        ) : (
          <div className="d-flex overflow-auto">
            {conversations?.map((conversation, index) => (
              <div key={index} className="conversation-bubble p-1 m-1">
                <div className="users-list d-flex">
                  {conversation.members
                    .filter((member) => !member.isAdmin)
                    .map((user, userIndex) => (
                      <div
                        key={userIndex}
                        className="user d-flex flex-column align-items-center"
                        onClick={() => openConversation(user)}
                      >
                        <img
                          src={user.image}
                          alt={user.name}
                          className="rounded-circle mr-2 border border-danger"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <p>{user.name}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ConversationsList;
