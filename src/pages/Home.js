import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import SelectDate from "../components/SelectDate";
import SelectEating from "../components/SelectEating";
import RecipeItem from "../components/RecipeItem";
import EmptyAdd from "../components/EmptyAdd";

const Home = ({ allRecipes }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [eating, setEating] = useState("breakfast");
  const [diaryList, setDiaryList] = useState([]);
  const [recomCalories, setRecomCalories] = useState([]);

  const handleSelectDate = (value) => {
    setStartDate(value);
  };
  const handleChangeEating = (value) => {
    setEating(value.target.value);
  };

  const db = getDatabase();

  useEffect(() => {
    const foodDiary = ref(
      db,
      `diary/${startDate.toString().slice(0, 15)}/${eating}`
    );
    const unregisterFunction = onValue(foodDiary, (snapshot) => {
      const newValObj = snapshot.val();
      if (newValObj !== null) {
        const keys = Object.keys(newValObj);
        const newObjArray = keys.map((keyString) => {
          return newValObj[keyString];
        });
        setDiaryList(newObjArray);
      } else {
        setDiaryList([]);
      }
    });

    function cleanup() {
      unregisterFunction();
    }
    return cleanup;
  }, [startDate, eating]);

  useEffect(() => {
    const foodDiary = ref(
      db,
      `diary/${startDate.toString().slice(0, 15)}/recomCalories`
    );
    const unregisterFunction = onValue(foodDiary, (snapshot) => {
      const newValObj = snapshot.val();
      if (newValObj !== null) {
        console.log(":newValObj", newValObj);
        const keys = Object.keys(newValObj);
        const newObjArray = keys.map((keyString) => {
          return newValObj[keyString];
        });
        setRecomCalories(newObjArray);
      } else {
        setRecomCalories("");
      }
    });

    function cleanup() {
      unregisterFunction();
    }
    return cleanup;
  }, [startDate]);

  let foodDiaryNames = [];
  for (let i = 0; i < diaryList.length; i++) {
    if (diaryList.length) {
      foodDiaryNames.push(diaryList[i].foodName);
    }
  }

  const newAllRecipesFunc = () => {
    const data = allRecipes.filter((row) => foodDiaryNames.includes(row[0]));
    return data;
  };
  const newAllRecipes = newAllRecipesFunc();

  console.log("newAllRecipes", newAllRecipes)

  let sumArray = []
  for (let i = 0; i < newAllRecipes.length; i++) {
    if (diaryList.length) {
      let newArray = newAllRecipes[i][1].products.reduce(
        (acc, current) => acc + +current.calories,
        0
      );
      sumArray.push(newArray)
    }
  }

  const newArray = sumArray.reduce(
    (acc, current) => acc + +current,
    0
  );

  return (
    <>
      <SelectDate selected={startDate} handleSelectDate={handleSelectDate} />
      <SelectEating value={eating} handleChangeEating={handleChangeEating} />

      {newAllRecipes.length ? (
        <>
          <div className="diary-result">
            <div className="diary-result__item">
              <span>Рекомендуемая калорийность за день:&nbsp;</span>
              <span className="diary-result__item-sum">
                {recomCalories[recomCalories.length - 1]} kCal
              </span>
            </div>
            <div className="diary-result__item">
              <span>Всего калорий:&nbsp;</span>
              <span className="diary-result__item-sum">
                {newArray} kCal
              </span>
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
    </>
  );
};

export default Home;
