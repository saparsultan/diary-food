import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ref,
  set,
  get,
  remove,
} from "firebase/database";
import { auth, database } from "../firebase-config";
import ModalNotify from "./ModalNotify";
import calories from "../assets/images/calories.svg";

const RecipeItem = ({
  data,
  date,
  eating,
  recomCalories,
  isDiary,
  handleCheckClick,
}) => {
  let initvalue = 0;
  const userId = auth?.currentUser?.uid;
  const [favorites, setFavorites] = useState([]);
  const [diaryFoodId, setDiaryFoodId] = useState([]);
  const [isFavorite, setIsFavorite] = useState(favorites?.includes(data[0]));
  const [isDiaryFoodId, setIsDiaryFoodId] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
  }, [userId, isFavorite]);

  useEffect(() => {
    const getDiaryFood = async () => {
      const diaryFoodRef = ref(
        database,
        `diary/${auth?.currentUser?.uid}/${date
          ?.toString()
          .slice(0, 15)}/${eating}`
      );
      const snapshotDiaryFood = await get(diaryFoodRef);
      const dataDiaryFood = await snapshotDiaryFood.val();
      const newDiaryFood = dataDiaryFood ? Object.keys(dataDiaryFood) : [];

      const newObjArray = newDiaryFood.map((keyString) => {
        return dataDiaryFood[keyString];
      });

      setDiaryFoodId(newObjArray);
      if (newObjArray.includes(data[0])) {
        setIsDiaryFoodId(true);
      } else {
        setIsDiaryFoodId(false);
      }
    };
    function cleanup() {
      getDiaryFood();
    }
    return cleanup();
  }, [date, eating, isDiaryFoodId]);

  useEffect(() => {
    let updateFavorite = favorites?.includes(data[0]);
    setIsFavorite(updateFavorite);
  }, [isFavorite, favorites, data]);

  const sumCalories = data[1]?.products.reduce(
    (acc, current) => acc + +current.calories,
    initvalue
  );


  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleAddDiary = (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      const recomCaloriesRef = ref(
        database,
        `diary/${auth?.currentUser?.uid}/${date
          ?.toString()
          .slice(0, 15)}/recomCalories`
      );
      const eatingRef = ref(
        database,
        `diary/${auth?.currentUser?.uid}/${date
          ?.toString()
          .slice(0, 15)}/${eating}/${data[0]}`
      );
      set(eatingRef, data[0]);
      set(recomCaloriesRef, +recomCalories);
      setIsDiaryFoodId(true);
    } else {
      handleOpenModal();
      setTimeout(() => {
        handleCloseModal();
      }, 3000);
    }
  };

  const handleRemoveDiary = async (e) => {
    e.preventDefault();
    if (auth?.currentUser) {
      const eatingRef = ref(
        database,
        `diary/${auth?.currentUser?.uid}/${date
          ?.toString()
          .slice(0, 15)}/${eating}/${data[0]}`
      );
      await remove(eatingRef);
      setIsDiaryFoodId(false);
    } else {
      handleOpenModal();
      setTimeout(() => {
        handleCloseModal();
      }, 3000);
    }
  };

  const handleAddFavorites = async (e) => {
    e.preventDefault();
    if (auth?.currentUser) {
      const favoriteRef = ref(
        database,
        `favorites/${auth?.currentUser?.uid}/${data[0]}`
      );
      await set(favoriteRef, {
        timestamp: new Date().toISOString(),
      });
      setIsFavorite(true);
    } else {
      handleOpenModal();
      setTimeout(() => {
        handleCloseModal();
      }, 3000);
    }
  };

  const handleRemoveFavorites = async (e) => {
    e.preventDefault();
    if (auth?.currentUser) {
      const favoriteRef = ref(
        database,
        `favorites/${auth?.currentUser?.uid}/${data[0]}`
      );
      await remove(favoriteRef);
      setIsFavorite(false);
    } else {
      handleOpenModal();
      setTimeout(() => {
        handleCloseModal();
      }, 3000);
    }
  };

  return (
    <>
      <div className="recipe">
        <Link
          to={`/recipes/${data[0]}`}
          className="recipe__img"
          state={{ isFavorite: isFavorite }}
        >
          <img
            src={data[1]?.image}
            alt={data[1]?.name}
          />
        </Link>
        <Link to={`/recipes/${data[0]}`} state={{ isFavorite: isFavorite }} className="recipe__title">{data[1]?.name}</Link>
        <div className="recipe__footer">
          {isDiaryFoodId === true ? (
            <div
              className="btn btn--block btn--one"
              onClick={handleRemoveDiary}
              style={{ backgroundColor: "#e45c5c" }}
            >
              <span>Удалить</span>
            </div>
          ) : (
              <button
                className="btn btn--block btn--one"
                onClick={handleAddDiary}
              >

                <span>В дневник</span>
              </button>
          )}
                    <div className="nutri-value nutri-value--one">
            <div className="nutri-value__info">
              <img src={calories} alt="Калории" width="20px" height="20px" />
              <div className="nutri-value__sum">{Number.isInteger(sumCalories) ? sumCalories : sumCalories.toFixed(2)}</div>
            </div>
            <span className="nutri-value__name">KCal</span>
          </div>
        </div>
        {isFavorite === true ? (
            <div
              className="btn btn--block btn--favorite"
              onClick={(e) => {
                handleRemoveFavorites(e);
                handleCheckClick && handleCheckClick();
              }}
              style={{ gridTemplateColumns: "1fr", gridGap: "none" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#019852"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2366 5.39584L12 6.29803L12.7634 5.39584C13.2203 4.85584 13.7732 4.42965 14.4318 4.11437C15.078 3.80504 15.7635 3.6499 16.5 3.6499C17.8177 3.6499 18.8666 4.08072 19.7179 4.93201C20.5692 5.7833 21 6.83223 21 8.1499C21 9.79374 20.4011 11.3223 19.1263 12.762C17.7379 14.33 16.1571 15.9115 14.3818 17.5059L14.3818 17.5059L14.3762 17.5109L12.6762 19.0609L12.6757 19.0614C12.4757 19.2441 12.2659 19.3249 12 19.3249C11.7341 19.3249 11.5243 19.2441 11.3243 19.0614L9.60009 17.4872C9.60006 17.4871 9.60003 17.4871 9.59999 17.4871C7.85496 15.8902 6.28293 14.3096 4.88254 12.7454C3.60146 11.3145 3 9.79166 3 8.1499C3 6.83223 3.43081 5.7833 4.28211 4.93201C5.1334 4.08072 6.18232 3.6499 7.5 3.6499C8.23653 3.6499 8.92204 3.80504 9.5682 4.11437C10.2268 4.42965 10.7797 4.85584 11.2366 5.39584Z"
                  strokeWidth="2"
                />
              </svg>
            </div>
          ) : (
             (
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
            )
          )}
      </div>
      <ModalNotify isOpen={isOpen} onClose={handleCloseModal} type="error">
        <p>Вам необходимо войти.</p>
      </ModalNotify>
    </>
  );
};

export default RecipeItem;
