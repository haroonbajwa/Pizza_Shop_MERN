import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Categories = () => {
  const pizzasState = useSelector((state) => state.getAllPizzasReducer);
  const { categories } = pizzasState;
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    if (categories) setAllCategories(categories);
  }, [categories]);

  return (
    <div className="mx-1 my-4">
      <h3 className="text-start">Categories</h3>
      <div
        className="mb-3 mx-1"
        style={{ width: "90px", borderBottom: "2px solid #dc3545" }}
      ></div>

      <div
        className="row flex-nowrap mx-1 py-1"
        style={{ overflowX: "scroll" }}
      >
        {[...Array(6).keys()].map((number, index) => {
          return (
            <div
              className="col-4 p-1"
              style={{
                border: "1px solid #dc3545",
                margin: "2px",
                borderRadius: "5px",
              }}
              key={index}
            >
              <div className="category-container d-flex align-items-center">
                <img
                  className="img-thumbnail"
                  src="https://img.freepik.com/free-photo/tasty-top-view-sliced-pizza-italian-traditional-round-pizza_90220-1353.jpg?t=st=1704027186~exp=1704030786~hmac=8780b4792fc5c4e4976d05970ed2043b981678ff7ac168d887b099bb402c65b8&w=740"
                  alt="Pizzas"
                  width={70}
                />
                <div>
                  <h3 style={{ fontSize: "16px" }}>Pizzas</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
