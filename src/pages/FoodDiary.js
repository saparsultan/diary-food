import React, { useEffect } from "react";
import Search from "../components/Search";
import SelectDate from "../components/SelectDate";
import SelectEating from "../components/SelectEating";
import CaloriesFilter from "../components/CaloriesFilter";
import CategoryFilter from "../components/CategoryFilter";
// import EatingFilter from "../components/EatingFilter";
import RecipeUsesFilter from "../components/RecipUsesFilter";
import RecipeItem from "../components/RecipeItem";
// import eatingList from "../data/eatingList";
import recipeUses from "../data/recipeUses";

const FoodDiary = ({ allRecipes }) => {
  const [startDate, setStartDate] = React.useState(new Date());
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [eating, setEating] = React.useState("breakfast");
  const [minCalories, setMinCalories] = React.useState(0);
  const [maxCalories, setMaxCalories] = React.useState(0);

  // const [eatingValue, setEatingValue] = React.useState(eatingList);
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

  // const handleChangeEatingList = (e) => {
  //   const { value, checked } = e.target;
  //   return setEatingValue((pre) =>
  //     pre.map((item) =>
  //       item.name === value ? { ...item, check: checked } : item
  //     )
  //   );
  // };

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

    // if (eatingValue[0].check) {
    //   updatedList = updatedList.filter(
    //     (item) => item[1].breakfast === eatingValue[0].check
    //   );
    // }

    // if (eatingValue[1].check) {
    //   updatedList = updatedList.filter(
    //     (item) => item[1].lunch === eatingValue[1].check
    //   );
    // }

    // if (eatingValue[2].check) {
    //   updatedList = updatedList.filter(
    //     (item) => item[1].dinner === eatingValue[2].check
    //   );
    // }

    if (recipeUsesValue[0].check) {
      updatedList = updatedList.filter(
        (item) => item[1].isMilk !== recipeUsesValue[0].check
      );
    }

    if (recipeUsesValue[1].check) {
      updatedList = updatedList.filter(
        (item) => item[1].isEggs !== recipeUsesValue[1].check
      );
    }

    if (recipeUsesValue[2].check) {
      updatedList = updatedList.filter(
        (item) => item[1].isPeanut !== recipeUsesValue[2].check
      );
    }

    if (recipeUsesValue[3].check) {
      updatedList = updatedList.filter(
        (item) => item[1].isNuts !== recipeUsesValue[3].check
      );
    }

    if (recipeUsesValue[4].check) {
      updatedList = updatedList.filter(
        (item) => item[1].isSoy !== recipeUsesValue[4].check
      );
    }

    if (recipeUsesValue[5].check) {
      updatedList = updatedList.filter(
        (item) => item[1].isFish !== recipeUsesValue[5].check
      );
    }

    if (recipeUsesValue[6].check) {
      updatedList = updatedList.filter(
        (item) => item[1].isClam !== recipeUsesValue[6].check
      );
    }

    if (recipeUsesValue[7].check) {
      updatedList = updatedList.filter(
        (item) => item[1].isWheat !== recipeUsesValue[7].check
      );
    }

    setList(updatedList);
  };

  useEffect(() => {
    setList(allRecipes);
  }, [allRecipes]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line
  }, [query, category, recipeUsesValue, minCalories, maxCalories]);

  return (
    <div className="content__wrap">
      <SelectDate selected={startDate} handleSelectDate={handleSelectDate} />
      <SelectEating value={eating} handleChangeEating={handleChangeEating} />

      <div className="recipe-grid__wrap">
        <div className="recipe-grid__title">Подобрено {list.length}</div>
        <div className="recipe-grid">
          {list.map((data, index) => (
            <RecipeItem
              key={data[0] + index}
              data={data}
              date={startDate}
              eating={eating}
            />
          ))}
        </div>
      </div>
      <div className="filter-grid">
        <Search query={query} handleQuery={handleQuery} />
        <CategoryFilter category={category} handleCategory={handleCategory} />
        <CaloriesFilter
          minCalories={minCalories}
          maxCalories={maxCalories}
          handleChangeMinCalories={handleChangeMinCalories}
          handleChangeMaxCalories={handleChangeMaxCalories}
        />
        {/* <EatingFilter
          data={eatingValue}
          handleChangeEatingList={handleChangeEatingList}
        /> */}
        <RecipeUsesFilter
          data={recipeUsesValue}
          handleChangeRecipeUses={handleChangeRecipeUses}
        />
      </div>
    </div>
  );
};

export default FoodDiary;
