import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CaloriesFilter from "../components/CaloriesFilter";
import CategoryFilter from "../components/CategoryFilter";
import Search from "../components/Search";
import SelectDate from "../components/SelectDate";
import SelectEating from "../components/SelectEating";
import { ADD_DIARY } from "../utils/consts";
import recipeUses from "../data/recipeUses";
import RecipeUsesFilter from "../components/RecipUsesFilter";
import RecipeItem from "../components/RecipeItem";

const FoodDiary = ({ allRecipes }) => {
  let { pathname } = useLocation();
  const [startDate, setStartDate] = React.useState(new Date());
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [eating, setEating] = React.useState("breakfast");
  const [recomCalories, setRecomCalories] = React.useState("");
  const [minCalories, setMinCalories] = React.useState(0);
  const [maxCalories, setMaxCalories] = React.useState(0);

  const [recipeUsesValue, setRecipeUsesValue] = React.useState(recipeUses);
  const [list, setList] = React.useState([]);

  const handleSelectDate = (value) => {
    setStartDate(value);
  };

  const handleQuery = (value) => {
    setQuery(value);
  };

  const handleCategory = (value) => {
    setCategory(value);
  };

  const handleChangeMinCalories = ({ target }) => {
    let { value, min } = target;
    value = Math.max(Number(min), Math.min(Number(value)));
    setMinCalories(value);
  };

  const handleChangeMaxCalories = ({ target }) => {
    let { value, min } = target;
    value = Math.max(Number(min), Math.min(Number(value)));
    setMaxCalories(value);
  };

  const handleChangeEating = (value) => {
    setEating(value.target.value);
  };

  const handleChangeRecipeUses = (e) => {
    const { value, checked } = e.target;
    return setRecipeUsesValue((pre) =>
      pre.map((item) =>
        item.name === value ? { ...item, check: checked } : item
      )
    );
  };

  const applyFilters = () => {
    let updatedList = allRecipes;

    if (category) {
      updatedList = updatedList.filter((item) => item[1].category === category);
    }

    if (query) {
      updatedList = updatedList.filter(
        (item) =>
          item[1].name.toLowerCase().search(query.toLowerCase().trim()) !== -1
      );
    }

    if (minCalories > 0 && maxCalories > 0) {
      updatedList = updatedList.filter((item) => {
        let result = false;
        let sumCalories = item[1].products.reduce(
          (acc, current) => acc + +current.calories,
          0
        );
        if (sumCalories >= minCalories && sumCalories <= maxCalories) {
          result = true;
        } else {
          return result;
        }
        return result;
      });
    }

    if (recipeUsesValue[0].check) {
      updatedList = updatedList.filter(
        (item) => item[1].isOnion !== recipeUsesValue[0].check
      );
    }

    if (recipeUsesValue[1].check) {
      updatedList = updatedList.filter(
        (item) => item[1].isMilk !== recipeUsesValue[1].check
      );
    }

    if (recipeUsesValue[2].check) {
      updatedList = updatedList.filter(
        (item) => item[1].isEggs !== recipeUsesValue[2].check
      );
    }

    if (recipeUsesValue[3].check) {
      updatedList = updatedList.filter(
        (item) => item[1].isPig !== recipeUsesValue[3].check
      );
    }

    if (recipeUsesValue[4].check) {
      updatedList = updatedList.filter(
        (item) => item[1].isFish !== recipeUsesValue[4].check
      );
    }

    if (recipeUsesValue[5].check) {
      updatedList = updatedList.filter(
        (item) => item[1].isAlcohol !== recipeUsesValue[5].check
      );
    }

    setList(updatedList);
  };

  useEffect(() => {
    setList(allRecipes);
  }, [allRecipes]);

  useEffect(() => {
    applyFilters();
  }, [query, category, recipeUsesValue, minCalories, maxCalories]);

  return (
    <>
      <SelectDate selected={startDate} handleSelectDate={handleSelectDate} />
      <div className="form-item" style={{ marginTop: "20px" }}>
        <label className="form-item__label" style={{ marginBottom: "4px" }}>
          ?????????????????????????? ????????????????????????
        </label>
        <input
          type="number"
          className="form-item__input form-item__input--recom"
          placeholder="0"
          value={recomCalories}
          onChange={(e) => setRecomCalories(e.target.value)}
          style={{ height: "46px", border: "none" }}
        />
      </div>
      <SelectEating value={eating} handleChangeEating={handleChangeEating} />

      <div className="recipe-grid__wrap">
        <div className="recipe-grid__title">?????????????????? {list.length}</div>
        <div className="recipe-grid">
          {list.map((data, index) => (
            <RecipeItem
              key={data[0] + index}
              data={data}
              date={startDate}
              eating={eating}
              recomCalories={recomCalories}
              isDiary
            />
          ))}
        </div>
      </div>

      {pathname === ADD_DIARY ? (
        <div className="filter-grid" style={{ paddingTop: "24px" }}>
          <Search query={query} handleQuery={handleQuery} />
          <CategoryFilter category={category} handleCategory={handleCategory} />
          <CaloriesFilter
            minCalories={minCalories}
            maxCalories={maxCalories}
            handleChangeMinCalories={handleChangeMinCalories}
            handleChangeMaxCalories={handleChangeMaxCalories}
          />
          <RecipeUsesFilter
            data={recipeUsesValue}
            handleChangeRecipeUses={handleChangeRecipeUses}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FoodDiary;
