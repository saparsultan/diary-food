import React, { useState, useEffect } from "react";
import { ref, onValue, set } from "firebase/database";
import SelectDate from "../components/SelectDate";
import SelectEating from "../components/SelectEating";
import RecipeItem from "../components/RecipeItem";
import EmptyAdd from "../components/EmptyAdd";
import { auth, database } from "../firebase-config";

const Home = ({ allRecipes }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [eating, setEating] = useState("breakfast");
  const [diaryFoodName, setDiaryFoodName] = useState(null);
  const [recomCalories, setRecomCalories] = useState(null);

  const [recomCaloriesTarget, setRecomCaloriesTarget] = useState("");

  const handleSelectDate = (value) => {
    setStartDate(value);
  };
  const handleChangeEating = (value) => {
    setEating(value.target.value);
  };

  useEffect(() => {
    const foodDiary = ref(
      database,
      `diary/${auth?.currentUser?.uid}/${startDate
        .toString()
        .slice(0, 15)}/${eating}`
    );
    const unregisterFunction = onValue(foodDiary, (snapshot) => {
      const newValObj = snapshot.val();
      const newObjKeys = newValObj ? Object.keys(newValObj) : [];
      const newObjArray = newObjKeys.map((keyString) => {
        return newValObj[keyString];
      });
      setDiaryFoodName(newObjArray);
    });

    function cleanup() {
      unregisterFunction();
    }
    return cleanup;
  }, [startDate, eating]);

  useEffect(() => {
    const foodDiary = ref(
      database,
      `diary/${auth?.currentUser?.uid}/${startDate
        .toString()
        .slice(0, 15)}/recomCalories`
    );
    const unregisterFunction = onValue(foodDiary, (snapshot) => {
      const newValObj = snapshot.val() ? snapshot.val() : null;
      setRecomCalories(newValObj);
    });

    function cleanup() {
      unregisterFunction();
    }
    return cleanup;
  }, [startDate]);

  const newAllRecipesFunc = () => {
    const data = allRecipes?.filter((row) => diaryFoodName?.includes(row[0]));
    return data;
  };
  const newAllRecipes = newAllRecipesFunc();

  let sumArray = [];
  for (let i = 0; i < newAllRecipes.length; i++) {
    if (diaryFoodName) {
      let newArray = newAllRecipes[i][1].products.reduce(
        (acc, current) => acc + +current.calories,
        0
      );
      sumArray.push(newArray);
    }
  }

  const newArray = sumArray.reduce((acc, current) => acc + +current, 0);

  const handleAddRecomCalories = (e) => {
    e.preventDefault();
    if (auth?.currentUser) {
      const recomCaloriesRef = ref(
        database,
        `diary/${auth?.currentUser?.uid}/${startDate
          ?.toString()
          .slice(0, 15)}/recomCalories`
      );
      set(recomCaloriesRef, +recomCaloriesTarget);
    }
  };

  return (
    <div className="content__wrap">
      <SelectDate selected={startDate} handleSelectDate={handleSelectDate} />
      <SelectEating value={eating} handleChangeEating={handleChangeEating} />
      {newAllRecipes.length ? (
        <>
          <div className="diary-result">
            <div className="diary-result__item">
              <span>Рекомендуемая калорийность за день:&nbsp;</span>
              <span className="diary-result__item-sum">
                {recomCalories} kCal
              </span>
            </div>
            <div className="diary-result__item">
              <span>Всего калорий:&nbsp;</span>
              <span className="diary-result__item-sum">{newArray} kCal</span>
            </div>
          </div>
          <div className="recipe-grid">
            {newAllRecipes.map((data, index) => (
              <RecipeItem
                key={data[0] + index}
                data={data}
                date={startDate}
                eating={eating}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyAdd eating={eating} />
      )}
      <div className="filter-grid">
        <div className="form-item">
          <label class="form-item__label">
            Рекомендуемая <br /> калорийность за день:
          </label>
          <input
            type="text"
            className="form-item__input"
            placeholder="0"
            value={recomCaloriesTarget}
            onChange={(e) => setRecomCaloriesTarget(e.target.value)}
            style={{
              borderRadius: "50px",
            }}
          />
        </div>
        <button
          className="btn btn--one btn--recomcal"
          onClick={handleAddRecomCalories}
          style={{
            justifyContent: "center",
            marginTop: "12px",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
          disabled={recomCalories > 0 && recomCalories ? true : false}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default Home;
