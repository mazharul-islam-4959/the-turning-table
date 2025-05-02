import React, { useEffect, useState } from "react";
import AppDownload from "../../components/AppDownload/AppDownload";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import ExploreMenu from "../../components/Navbar/ExploreMenu/ExploreMenu";
import Header from "../../components/Navbar/Header/Header";
import "./Home.css";

const Home = ({ search }) => {
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (search.length) {
      setCategory("All");
    }
  }, [search]);

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} search={search} />
      <AppDownload />
    </div>
  );
};

export default Home;
