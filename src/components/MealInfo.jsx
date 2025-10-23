// src/components/MealInfo.js
import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';

export default function MealInfo() {
  const { mealid } = useParams();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
        );
        const data = await res.json();
        setInfo(data.meals ? data.meals[0] : null);
      } catch (err) {
        console.error('Failed to load meal:', err);
        setInfo(null);
      }
    };
    fetchMeal();
  }, [mealid]);

  if (!info) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '500px' }}>
        <p className="text-center text-primary fw-bold fs-2">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg rounded-4">
        <div className="row g-0">
          <div className="col-md-5 col-lg-4 text-center bg-light p-3">
            <img
              src={info.strMealThumb}
              alt={info.strMeal}
              className="img-fluid rounded-3"
              style={{ maxHeight: '350px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-7 col-lg-8 p-4">
            <h2 className="text-primary fw-bold mb-3">{info.strMeal}</h2>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <span className="badge bg-warning text-dark fs-6 px-3 py-2">Category: {info.strCategory}</span>
              <span className="badge bg-info text-white fs-6 px-3 py-2">Area: {info.strArea}</span>
            </div>
            <p className="text-secondary fs-5 lh-lg">{info.strInstructions}</p>
            <div className="mt-4">
              <NavLink to="/" className="btn btn-outline-primary px-4 py-2">
                ← Back to Meals
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}