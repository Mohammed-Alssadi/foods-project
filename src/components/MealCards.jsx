// src/components/MealCards.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
export default function MealCards({ name, category, image, id }) {
   const isMobile = useMediaQuery("(max-width: 576px)");
  return (
    <div id="meals" className=''>
      <div className="card-meal">
        <div className="card-meleal-img">
          <img src={image} alt={name} className="img-fluid rounded" />
        </div>
        <div className="card-meal-info">
          <p className= {isMobile ? "text-sky-800 " : "fs-6 pb-2 mb-1 text-sky-800 fw-bold "}>{name}</p>
          <p className={isMobile ? "" : "fs-6 mb-1 pb-1"}>{category}</p>
          <NavLink to={`/${id}`}>
            <button className={isMobile ? "btnon  mt-0" : "btnon fs-6 my-1"}>Recipe</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}