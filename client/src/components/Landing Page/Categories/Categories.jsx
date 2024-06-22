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
        {/* {[...Array(6).keys()].map((number, index) => { */}
        {allCategories.map((category, index) => {
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
                  src={`${process.env.REACT_APP_BASE_URL}/uploads/${category.image}`}
                  alt="Pizzas"
                  width={50}
                />
                <div>
                  <h3 className="m-0" style={{ fontSize: "16px" }}>
                    {category.name}
                  </h3>
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
