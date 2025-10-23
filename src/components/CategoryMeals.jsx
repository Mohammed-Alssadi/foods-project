import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MealCards from "/src/components/MealCards"; // استخدم الكومبوننت اللي عندك

export default function CategoryMeals() {
  const { categoryName } = useParams();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then((res) => setMeals(res.data.meals || []))
    
      .catch((err) => console.error("Error fetching meals:", err));
  }, [categoryName]);

  return (
    <div className=" container py-4 text-center ">
      <h2 className="text-white mb-4">{categoryName} Meals</h2>
      <div className="row g-4">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div className=" cards col-12 col-md-6 col-lg-4" key={meal.idMeal}>
              <MealCards
                id={meal.idMeal}
                name={meal.strMeal}
                image={meal.strMealThumb}
                category={categoryName}
              />
            </div>
          ))
        ) : (
          <p className="text-white fs-4">No meals found in this category.</p>
        )}
      </div>
    </div>
  );
}
