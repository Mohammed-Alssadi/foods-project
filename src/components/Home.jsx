import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import MealCards from "/src/components/MealCards";
import { useMediaQuery } from "@mui/material";

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 576px)");
  const [meals, setMeals] = useState([]);

  // 🧠 جلب 10 وجبات عشوائية فقط مرة عند التحميل
  useEffect(() => {
    async function fetchRandomMeals(count = 10) {
      const promises = [];
      for (let i = 0; i < count; i++) {
        promises.push(
          axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
        );
      }
      const responses = await Promise.all(promises);
      const data = responses.map((res) => res.data.meals[0]);
      setMeals(data);
    }

    fetchRandomMeals();
  }, []);

  // ⚙️ إعدادات السلايدر
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: isMobile ? 2 : 4, // ✅ عدد الكروت حسب حجم الشاشة
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000, // مدة التحريك لكل slide
    autoplaySpeed: 1000, // يبدأ مباشرة بعد انتهاء التحريك
    cssEase: "linear", // حركة سلسة
     arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="container" style={{height:"100%",marginTop:"170px"}}>
        <h1 className=" col-lg-12 text-center text-white mb-4  fw-bolder mt-5 get-started ">Find, cook, and enjoy great meals !</h1>
      {meals.length === 0 ? (
        <p className="text-center text-white fs-4">Loading random meals...</p>
      ) : (
        // 🔹 إضافة key لتحديث السلايدر عند تغير حجم الشاشة
        <Slider key={isMobile ? "mobile" : "desktop"} {...settings}>
          {meals.map((meal) => (
            <div key={meal.idMeal} className="mt-5 pb-5">
              <MealCards
                id={meal.idMeal}
                name={meal.strMeal}
                category={meal.strCategory}
                image={meal.strMealThumb}
                isMobile={isMobile}
              />
            </div>
          ))}
        </Slider>
        
      )}
    </div>
  );
}
