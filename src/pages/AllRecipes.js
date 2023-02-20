import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import RecipeItem from "../components/RecipeItem";
import recipeUses from "../data/recipeUses";

import { RECIPES } from "../utils/consts";
import Search from "../components/Search";
import CategoryFilter from "../components/CategoryFilter";
import RecipeUsesFilter from "../components/RecipUsesFilter";

const AllRecipes = ({ allRecipes }) => {
  let { pathname } = useLocation();

  const [resultsFound, setResultsFound] = React.useState(true);
  const [category, setCategory] = React.useState("");
  const [recipeUsesValue, setRecipeUsesValue] = React.useState(recipeUses);
  const [list, setList] = React.useState([]);
  const [query, setQuery] = React.useState("");

  console.log("recipeUsesValue", recipeUsesValue)

  useEffect(() => {
    setList(allRecipes)
  },[allRecipes])

  useEffect(() => {
    applyFilters();
  }, [query, category, recipeUsesValue]);

  const handleQuery = (value) => {
    setQuery(value)
  };

  const handleCategory = (value) => {
    setCategory(value)
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
      updatedList = updatedList.filter(
        (item) => item[1].category === category
      );
    }

    if (query) {
      updatedList = updatedList.filter(
        (item) =>
          item[1].name.toLowerCase().search(query.toLowerCase().trim()) !==
          -1
      );
    }

    if(recipeUsesValue[0].check) {
      updatedList = updatedList.filter(item => item[1].isOnion !== recipeUsesValue[0].check)
    }

    if(recipeUsesValue[1].check) {
      updatedList = updatedList.filter(item => item[1].isMilk !== recipeUsesValue[1].check)
    }

    if(recipeUsesValue[2].check) {
      updatedList = updatedList.filter(item => item[1].isEggs !== recipeUsesValue[2].check)
    }

    if(recipeUsesValue[3].check) {
      updatedList = updatedList.filter(item => item[1].isPig !== recipeUsesValue[3].check)
    }

    if(recipeUsesValue[4].check) {
      updatedList = updatedList.filter(item => item[1].isFish !== recipeUsesValue[4].check)
    }

    if(recipeUsesValue[5].check) {
      updatedList = updatedList.filter(item => item[1].isAlcohol !== recipeUsesValue[5].check)
    }

    setList(updatedList);
    !updatedList.length ? setResultsFound(true) : setResultsFound(true);
  }

  console.log("Все рецепты", list);

  return (
    <>
      <Search query={query} handleQuery={handleQuery}/>

      <div className="recipe-grid">
        {list.map((data, index) => (
          <RecipeItem key={data[0] + index} data={data} isFavorite />
        ))}
      </div>

      {pathname === RECIPES ? (
        <div className="filter-grid">
          <CategoryFilter category={category} handleCategory={handleCategory}/>
          <RecipeUsesFilter data={recipeUsesValue} handleChangeRecipeUses={handleChangeRecipeUses}/>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AllRecipes;
