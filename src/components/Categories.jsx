import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="container py-4">
      <h2 className="text-center text-white mb-4">Meal Categories</h2>
      <div className="  row row-cols-2 row-cols-md-3 row-cols-lg-3 g-4">
        {categories.map((category) => (
          <div className=" cards col" key={category.idCategory}>
            <div
              className="card h-100 shadow-sm"
              style={{ cursor: "pointer", transition: "transform 0.3s" }}
              onClick={() => handleCategoryClick(category.strCategory)}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <img
                src={category.strCategoryThumb}
                className="card-img-top"
                alt={category.strCategory}
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">{category.strCategory}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
