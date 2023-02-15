import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import CreateRecipe from "./pages/CreateRecipe";
import AllRecipes from "./pages/AllRecipes";
import Favorites from "./pages/Favorites";
import RecipePage from "./pages/RecipePage";
import "react-tabs/style/react-tabs.scss";

function App() {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const recipes = ref(db, "recipes");
    const unregisterFunction = onValue(recipes, (snapshot) => {
      const newValObj = snapshot.val();
      const keys = Object.keys(newValObj);
      const newObjArray = keys.map((keyString) => {
        return newValObj[keyString];
      });
      setAllRecipes(newObjArray);
    });

    function cleanup() {
      unregisterFunction();
    }
    return cleanup;
  }, []);


  return (
    <div className="app">
      <Header />
      <main className="main__container">
        <div className="container">
          <div className="main">
            <Menu />
            <div className="content">
              <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="create-recipe" exact element={<CreateRecipe />} />
                <Route
                  path="create-product"
                  exact
                  element={<CreateProduct />}
                />
                <Route path="recipes" exact element={<AllRecipes allRecipes={allRecipes} />} />
                <Route path="favorites" exact element={<Favorites />} />
                <Route path="recipes/:id" element={<RecipePage />} />
              </Routes>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
