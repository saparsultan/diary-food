import React, { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { auth, database } from "../firebase-config";
import RecipeItem from "../components/RecipeItem";
import EmptyAdd from "../components/EmptyAdd";

const Favorites = () => {
  const userId = auth?.currentUser?.uid;
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isUpdatedFavorites, setIsUpdatedFavorites] = useState(false);
  const [filterData, setFilterData] = useState(
    data?.filter((row) => favorites?.includes(row[0]))
  );

  useEffect(() => {
    const getRecipes = async () => {
      const frecipesRef = ref(database, `recipes`);
      const snapshotRecipes = await get(frecipesRef);
      const dataRecipes = (await snapshotRecipes.val())
        ? Object.entries(snapshotRecipes.val())
        : [];
      setData(dataRecipes);
    };
    function cleanup() {
      getRecipes();
    }
    return cleanup();
  }, [userId]);

  useEffect(() => {
    const getFavorites = async () => {
      const favoritesRef = ref(database, `favorites/${userId}`);
      const snapshotFavorites = await get(favoritesRef);
      const dataFavorites = (await snapshotFavorites.val())
        ? Object.keys(snapshotFavorites.val())
        : [];
      setFavorites(dataFavorites);
    };
    function cleanup() {
      getFavorites();
    }
    return cleanup();
  }, [userId, isUpdatedFavorites]);

  useEffect(() => {
    const newData = data?.filter((row) => favorites?.includes(row[0]));
    setFilterData(newData);
  }, [favorites, data, isUpdatedFavorites]);

  const handleCheckClick = () => {
    setIsUpdatedFavorites(!isUpdatedFavorites);
  };

  return (
    <>
      {filterData.length > 0 ? (
        <>
          <div className="recipe-grid">
            {filterData.length > 0 &&
              filterData.map((item, i) => (
                <RecipeItem
                  data={item}
                  key={i + item[0]}
                  handleCheckClick={handleCheckClick}
                />
              ))}
          </div>
        </>
      ) : (
        <EmptyAdd />
      )}
    </>
  );
};

export default Favorites;
