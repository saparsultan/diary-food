import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ref, onValue, remove, set } from "firebase/database";
import { format } from "date-fns";
import { auth, database } from "../firebase-config";
import ProductItem from "./ProductItem";
import ModalNotify from "./ModalNotify";
import calories from "../assets/images/calories.svg";
import protein from "../assets/images/protein.svg";
import carb from "../assets/images/carb.svg";
import fat from "../assets/images/fat.svg";
import benefit from "../assets/images/benefit.svg";

const RecipeCard = ({ idRecipe }) => {
  const location = useLocation();
  const { isFavorite } = location.state;
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  const [item, setItem] = useState({});
  const [sumCalories, setSumCalories] = useState(0);
  const [sumProteins, setSumProteins] = useState(0);
  const [sumFats, setSumFats] = useState(0);
  const [sumCarbs, setSumCarbs] = useState(0);
  const [sumBenefit, setSumBenefit] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const itemRef = ref(database, `recipes/${idRecipe}`);
    onValue(
      itemRef,
      (snapshot) => {
        const itemData = snapshot.val();
        setItem(itemData);

        if (item !== undefined) {
          let initvalue = 0;
          const sumCalories = itemData?.products.reduce(
            (acc, current) => acc + +current.calories,
            initvalue
          );
          setSumCalories(sumCalories);

          const sumProteins = itemData?.products.reduce(
            (acc, current) => acc + +current.proteins,
            initvalue
          );
          setSumProteins(sumProteins);

          const sumFats = itemData?.products.reduce(
            (acc, current) => acc + +current.fats,
            initvalue
          );
          setSumFats(sumFats);

          const sumCarbs = itemData?.products.reduce(
            (acc, current) => acc + +current.carbs,
            initvalue
          );
          setSumCarbs(sumCarbs);

          const sumBenefit =
            (sumCalories + sumProteins + sumFats + sumCarbs) / 4;
          setSumBenefit(sumBenefit);
        }
      },
      {}
    );
    // eslint-disable-next-line
  }, [idRecipe]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleAddFavorites = async (e) => {
    e.preventDefault();
    if (auth?.currentUser) {
      const favoriteRef = ref(
        database,
        `favorites/${auth?.currentUser?.uid}/${idRecipe}`
      );
      await set(favoriteRef, {
        timestamp: new Date().toISOString(),
      });
      setIsFavoriteState(true);
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
        `favorites/${auth?.currentUser?.uid}/${idRecipe}`
      );
      await remove(favoriteRef);
      setIsFavoriteState(false);
    } else {
      handleOpenModal();
      setTimeout(() => {
        handleCloseModal();
      }, 3000);
    }
  };

  return (
    <>
      <div className="card__container">
        <div className="card">
          <div className="card-header">
            <div className="author">
              <div className="author__avatar">
                {item?.author?.name[0].toUpperCase()}
              </div>
              <div className="author__text">
                <div className="author__name">{item?.author?.name}</div>
                <div className="author__date">
                  {item?.createdAt &&
                    format(new Date(item?.createdAt), "dd.MM.yyyy")}
                </div>
              </div>
            </div>
            {isFavoriteState ? (
              <div className="favorite-btn" onClick={handleRemoveFavorites}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="#019852"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6276 25.8055L14.6275 25.8054L12.3036 23.6815L12.303 23.6809C9.98098 21.5622 7.88062 19.4465 6.00063 17.3341L5.26446 17.9893L6.00063 17.3341C4.24129 15.3574 3.39563 13.2112 3.39563 10.8667C3.39563 8.94592 4.02623 7.39408 5.27579 6.13994L5.2758 6.13993C6.52438 4.88675 8.07239 4.25439 9.99203 4.25439C11.0186 4.25439 11.9793 4.46273 12.8849 4.87765L12.8849 4.87765C13.7997 5.29678 14.5841 5.87512 15.246 6.61667L15.992 7.45248L16.7381 6.61666C17.3999 5.87512 18.1843 5.29678 19.0991 4.87765C20.0047 4.46273 20.9655 4.25439 21.992 4.25439C23.9117 4.25439 25.4649 4.88686 26.7222 6.14188L27.3721 5.49079L26.7222 6.14188C27.979 7.3964 28.6123 8.94763 28.6123 10.8667C28.6123 13.212 27.7676 15.3647 26.0098 17.3533C24.1359 19.4733 22.0177 21.5946 19.6537 23.7168L19.6537 23.7168L19.6477 23.7222L17.3651 25.8048L17.3644 25.8055C16.9674 26.1684 16.5266 26.3392 15.996 26.3392C15.4654 26.3392 15.0246 26.1684 14.6276 25.8055Z"
                    stroke="#019852"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            ) : (
              <div className="favorite-btn" onClick={handleAddFavorites}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6276 25.8055L14.6275 25.8054L12.3036 23.6815L12.303 23.6809C9.98098 21.5622 7.88062 19.4465 6.00063 17.3341L5.26446 17.9893L6.00063 17.3341C4.24129 15.3574 3.39563 13.2112 3.39563 10.8667C3.39563 8.94592 4.02623 7.39408 5.27579 6.13994L5.2758 6.13993C6.52438 4.88675 8.07239 4.25439 9.99203 4.25439C11.0186 4.25439 11.9793 4.46273 12.8849 4.87765L12.8849 4.87765C13.7997 5.29678 14.5841 5.87512 15.246 6.61667L15.992 7.45248L16.7381 6.61666C17.3999 5.87512 18.1843 5.29678 19.0991 4.87765C20.0047 4.46273 20.9655 4.25439 21.992 4.25439C23.9117 4.25439 25.4649 4.88686 26.7222 6.14188L27.3721 5.49079L26.7222 6.14188C27.979 7.3964 28.6123 8.94763 28.6123 10.8667C28.6123 13.212 27.7676 15.3647 26.0098 17.3533C24.1359 19.4733 22.0177 21.5946 19.6537 23.7168L19.6537 23.7168L19.6477 23.7222L17.3651 25.8048L17.3644 25.8055C16.9674 26.1684 16.5266 26.3392 15.996 26.3392C15.4654 26.3392 15.0246 26.1684 14.6276 25.8055Z"
                    stroke="#019852"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="card-main">
            <div className="card-main__title">{item?.name}</div>
            <div className="card-main__img">
              <img src={item?.image} alt={item?.name} />
            </div>
            <div className="card-main__nutri-value">
              <div className="nutri-value__list">
                <div className="nutri-value">
                  <div className="nutri-value__info">
                    <img
                      src={calories}
                      alt="Калории"
                      width="20px"
                      height="20px"
                    />
                    <div className="nutri-value__sum">
                      {Number.isInteger(sumCalories)
                        ? sumCalories
                        : sumCalories.toFixed(2)}
                    </div>
                  </div>
                  <span className="nutri-value__name">Калории</span>
                </div>
                <div className="nutri-value">
                  <div className="nutri-value__info">
                    <img
                      src={protein}
                      alt="Калории"
                      width="20px"
                      height="20px"
                    />
                    <div className="nutri-value__sum">
                      {Number.isInteger(sumProteins)
                        ? sumProteins
                        : sumProteins.toFixed(2)}
                    </div>
                  </div>
                  <span className="nutri-value__name">Белки</span>
                </div>
                <div className="nutri-value">
                  <div className="nutri-value__info">
                    <img src={fat} alt="Калории" width="20px" height="20px" />
                    <div className="nutri-value__sum">
                      {Number.isInteger(sumFats) ? sumFats : sumFats.toFixed(2)}
                    </div>
                  </div>
                  <span className="nutri-value__name">Жиры</span>
                </div>
                <div className="nutri-value">
                  <div className="nutri-value__info">
                    <img src={carb} alt="Калории" width="20px" height="20px" />
                    <div className="nutri-value__sum">
                      {Number.isInteger(sumCarbs)
                        ? sumCarbs
                        : sumCarbs.toFixed(2)}
                    </div>
                  </div>
                  <span className="nutri-value__name">Углеводы</span>
                </div>
                <div className="nutri-value">
                  <div className="nutri-value__info">
                    <img
                      src={benefit}
                      alt="Калории"
                      width="20px"
                      height="20px"
                    />
                    <div className="nutri-value__sum">
                      {Number.isInteger(sumBenefit)
                        ? sumBenefit
                        : sumBenefit.toFixed(2)}
                    </div>
                  </div>
                  <span className="nutri-value__name">Польза</span>
                </div>
              </div>
            </div>
            <div className="card-heading">Ингредиенты</div>
            <ProductItem products={item?.products} />
            <div className="card-heading">Описание</div>
            <p className="card-p">{item?.description}</p>
            <div className="card-heading">Метод приготовления</div>
            <p className="card-p">{item?.newMethods}</p>
          </div>
        </div>
      </div>
      <ModalNotify isOpen={isOpen} onClose={handleCloseModal} type="error">
        <p>Вам необходимо войти.</p>
      </ModalNotify>
    </>
  );
};

export default RecipeCard;
