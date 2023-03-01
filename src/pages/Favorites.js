import React, { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { auth, database } from "../firebase-config";
import RecipeItem from "../components/RecipeItem";

const Favorites = () => {
  const userId = auth?.currentUser?.uid;
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const frecipesRef = ref(database, `recipes`);
      const snapshotRecipes = await get(frecipesRef);
      const dataRecipes = snapshotRecipes.val()
        ? Object.entries(snapshotRecipes.val())
        : [];
      setData(dataRecipes);
    };
    function cleanup() {
      getRecipes();
    }
    return cleanup();
  }, []);

  useEffect(() => {
    const getFavorites = async () => {
      const favoritesRef = ref(database, `favorites/${userId}`);
      const snapshotFavorites = await get(favoritesRef);
      const dataFavorites = snapshotFavorites.val()
        ? Object.keys(snapshotFavorites.val())
        : [];
      setFavorites(dataFavorites);
    };
    function cleanup() {
      getFavorites();
    }
    return cleanup();
  }, [userId]);

  const filterDataFunc = () => {
    const newData = data.filter((row) => favorites.includes(row[0]));
    return newData;
  };
  const filterData = filterDataFunc();

  return (
    <>
      <div className="search">
        <input
          type="text"
          className="form-item__input search__input"
          placeholder="Поиск..."
        />
        <div className="search__icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21L15.803 15.803M15.803 15.803C17.2096 14.3965 17.9998 12.4887 17.9998 10.4995C17.9998 8.51035 17.2096 6.60262 15.803 5.19605C14.3965 3.78947 12.4887 2.99927 10.4995 2.99927C8.51035 2.99927 6.60262 3.78947 5.19605 5.19605C3.78947 6.60262 2.99927 8.51035 2.99927 10.4995C2.99927 12.4887 3.78947 14.3965 5.19605 15.803C6.60262 17.2096 8.51035 17.9998 10.4995 17.9998C12.4887 17.9998 14.3965 17.2096 15.803 15.803V15.803Z"
              stroke="#019852"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="recipe-grid">
        {filterData.length > 0 &&
          filterData.map((item, i) => (
            <RecipeItem data={item} key={i + item[0]} />
          ))}
      </div>
    </>
  );
};

export default Favorites;
