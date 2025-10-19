// src/components/HomePage.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MealCards from '/src/components/MealCards';
import Header from './ui/Header';

export default function HomePage({ search}) {
  const [meals, setMeals] = useState([]);

  // دالة جلب البيانات من الـ API
  const fetchData = useCallback(async (query) => {
    if (!query.trim()) {
      setMeals([]);
      localStorage.removeItem('meals');
      return;
    }

    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = res.data.meals || [];
      setMeals(data);

      // نحفظ آخر نتائج البحث في التخزين المحلي
      localStorage.setItem('meals', JSON.stringify(data));
      localStorage.setItem('search', query);
    } catch (err) {
      console.error('Error fetching meals:', err);
      setMeals([]);
    }
  }, []);

  // استدعاء البحث عند تغيير النص
  useEffect(() => {
    const timer = setTimeout(() => fetchData(search), 400);
    return () => clearTimeout(timer);
  }, [search, fetchData]);

  return (
    <>
      {/* الهيدر (يمكن عرضه هنا أو في App.js) */}
     

      {/* محتوى الصفحة */}
      <div className="cards container text-center p-5 pt-4">
        <div className="row g-4 m-auto">
          {meals.length > 0 ? (
            meals.map((meal) => (
              <div className=" cards col-12 col-md-6 col-lg-4" key={meal.idMeal}>
                <MealCards
                  id={meal.idMeal}
                  name={meal.strMeal}
                  category={meal.strCategory}
                  image={meal.strMealThumb}
                />
              </div>
            ))
          ) : search ? (
            <div className="home col-12">
              <p className="text-white fs-2 fw-bold uppercase">
                No meals found for "{search}".
              </p>
            </div>
          ) : (
            <div className="home col-12">
              <p className="text-white fs-1 fw-bold uppercase ">
                Search for a meal to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
