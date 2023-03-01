import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, push, update, set, get } from "firebase/database";
import calories from "../assets/images/calories.svg";
import protein from "../assets/images/protein.svg";
import carb from "../assets/images/carb.svg";
import fat from "../assets/images/fat.svg";
import benefit from "../assets/images/benefit.svg";
import { auth, database } from "../firebase-config";

const RecipeItem = ({
  data,
  date,
  eating,
  recomCalories,
  isDiary,
}) => {

  let initvalue = 0;
  const userId = auth?.currentUser?.uid;
  const [favorites, setFavorites] = useState([]);

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

  const isFavorite = favorites.includes(data[0]);

  const sumCalories = data[1]?.products.reduce(
    (acc, current) => acc + +current.calories,
    initvalue
  );

  const sumProteins = data[1]?.products.reduce(
    (acc, current) => acc + +current.proteins,
    initvalue
  );

  const sumFats = data[1]?.products.reduce(
    (acc, current) => acc + +current.fats,
    initvalue
  );

  const sumCarbs = data[1]?.products.reduce(
    (acc, current) => acc + +current.carbs,
    initvalue
  );

  const sumBenefit = (sumCalories + sumProteins + sumFats + sumCarbs) / 4;

  const handleAddDiary = (e) => {
    e.preventDefault();

    const db = getDatabase();
    const newFoodDiary = {
      foodName: data[0],
    };
    // const newRecomCalories = {
    //   recomCalories: recomCalories,
    // };
    const aaaDiary = ref(
      db,
      `diary/${date?.toString().slice(0, 15)}/recomCalories`
    );
    const foodDiary = ref(
      db,
      `diary/${date?.toString().slice(0, 15)}/${eating}`
    );
    push(foodDiary, newFoodDiary);
    push(aaaDiary, recomCalories);
  };

  // const handleAddFavorites = (e) => {
  //   e.preventDefault();
  //   const isFavorite = {
  //     isFavorite: !data[1]?.isFavorite
  //   }

  //   const db = getDatabase();
  //   const recipes = ref(db, `recipes/${data[0]}`)

  //   update(recipes, isFavorite)
  // }

  const handleAddFavorites = (e) => {
    e.preventDefault();
    const favoriteRef = ref(database, `favorites/${auth?.currentUser?.uid}/${data[0]}`);
    set(favoriteRef, {
      timestamp: new Date().toISOString()
    })
  };

  // const isFavorite = favorites.includes(item.id);

  return (
    <div className="recipe">
      <div className="recipe__title">{data[1]?.name}</div>
      <div className="nutri-value__list">
        <div className="nutri-value">
          <div className="nutri-value__info">
            <img src={calories} alt="Калории" width="20px" height="20px" />
            <div className="nutri-value__sum">{sumCalories}</div>
          </div>
          <span className="nutri-value__name">Калории</span>
        </div>
        <div className="nutri-value">
          <div className="nutri-value__info">
            <img src={protein} alt="Калории" width="20px" height="20px" />
            <div className="nutri-value__sum">{sumProteins}</div>
          </div>
          <span className="nutri-value__name">Белки</span>
        </div>
        <div className="nutri-value">
          <div className="nutri-value__info">
            <img src={fat} alt="Калории" width="20px" height="20px" />
            <div className="nutri-value__sum">{sumFats}</div>
          </div>
          <span className="nutri-value__name">Жиры</span>
        </div>
        <div className="nutri-value">
          <div className="nutri-value__info">
            <img src={carb} alt="Калории" width="20px" height="20px" />
            <div className="nutri-value__sum">{sumCarbs}</div>
          </div>
          <span className="nutri-value__name">Углеводы</span>
        </div>
        <div className="nutri-value">
          <div className="nutri-value__info">
            <img src={benefit} alt="Калории" width="20px" height="20px" />
            <div className="nutri-value__sum">{sumBenefit}</div>
          </div>
          <span className="nutri-value__name">Польза</span>
        </div>
      </div>
      <Link to={`/recipes/${data[0]}`} className="nutri-value__img">
        <img
          src={data[1]?.image}
          alt={data[1]?.name}
          width="322px"
          height="200px"
        />
      </Link>
      <div className="recipe__btns">
        {isDiary && (
          <div className="btn btn--block" onClick={handleAddDiary}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3.75V16.25M16.25 10H3.75"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>В дневник</span>
          </div>
        )}
        {isFavorite ? (
          <div
            className="btn btn--block btn--favorite"
            onClick={handleAddFavorites}
            style={{ gridTemplateColumns: "1fr", gridGap: "none" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path
                  d="M11.2366 5.39584L12 6.29803L12.7634 5.39584C13.2203 4.85584 13.7732 4.42965 14.4318 4.11437C15.078 3.80504 15.7635 3.6499 16.5 3.6499C17.8177 3.6499 18.8666 4.08072 19.7179 4.93201C20.5692 5.7833 21 6.83223 21 8.1499C21 9.79374 20.4011 11.3223 19.1263 12.762C17.7379 14.33 16.1571 15.9115 14.3818 17.5059L14.3818 17.5059L14.3762 17.5109L12.6762 19.0609L12.6757 19.0614C12.4757 19.2441 12.2659 19.3249 12 19.3249C11.7341 19.3249 11.5243 19.2441 11.3243 19.0614L9.60009 17.4872C9.60006 17.4871 9.60003 17.4871 9.59999 17.4871C7.85496 15.8902 6.28293 14.3096 4.88254 12.7454C3.60146 11.3145 3 9.79166 3 8.1499C3 6.83223 3.43081 5.7833 4.28211 4.93201C5.1334 4.08072 6.18232 3.6499 7.5 3.6499C8.23653 3.6499 8.92204 3.80504 9.5682 4.11437C10.2268 4.42965 10.7797 4.85584 11.2366 5.39584Z"
                  strokeWidth="2"
                />
            </svg>
          </div>
        ) : (
          <div
            className="btn btn--block btn--favorite"
            onClick={handleAddFavorites}
            style={{ gridTemplateColumns: "1fr", gridGap: "none" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path
                  d="M11.2366 5.39584L12 6.29803L12.7634 5.39584C13.2203 4.85584 13.7732 4.42965 14.4318 4.11437C15.078 3.80504 15.7635 3.6499 16.5 3.6499C17.8177 3.6499 18.8666 4.08072 19.7179 4.93201C20.5692 5.7833 21 6.83223 21 8.1499C21 9.79374 20.4011 11.3223 19.1263 12.762C17.7379 14.33 16.1571 15.9115 14.3818 17.5059L14.3818 17.5059L14.3762 17.5109L12.6762 19.0609L12.6757 19.0614C12.4757 19.2441 12.2659 19.3249 12 19.3249C11.7341 19.3249 11.5243 19.2441 11.3243 19.0614L9.60009 17.4872C9.60006 17.4871 9.60003 17.4871 9.59999 17.4871C7.85496 15.8902 6.28293 14.3096 4.88254 12.7454C3.60146 11.3145 3 9.79166 3 8.1499C3 6.83223 3.43081 5.7833 4.28211 4.93201C5.1334 4.08072 6.18232 3.6499 7.5 3.6499C8.23653 3.6499 8.92204 3.80504 9.5682 4.11437C10.2268 4.42965 10.7797 4.85584 11.2366 5.39584Z"
                  strokeWidth="2"
                />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeItem;
