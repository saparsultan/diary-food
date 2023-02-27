import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import CreateRecipe from "./pages/CreateRecipe";
import FoodDiary from "./pages/FoodDiary";
import AllRecipes from "./pages/AllRecipes";
import Favorites from "./pages/Favorites";
import RecipePage from "./pages/RecipePage";
import "react-tabs/style/react-tabs.scss";
import Login from "./pages/LoginPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";

function App() {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("isAuth", true);
        localStorage.setItem("user.uid", user?.uid);
        localStorage.setItem("user.email", user?.email);
        localStorage.setItem("user.name", user?.displayName);
        console.log("user", user)
      } else {
        return;
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const db = getDatabase();
    const recipes = ref(db, "recipes");
    const unregisterFunction = onValue(recipes, (snapshot) => {
      const newValObj = snapshot.val();
      const keys = Object.entries(newValObj);
      // const newObjArray = keys.map((keyString) => {
      //   return newValObj[keyString[0]];
      // });
      console.log("newObjArray", keys);
      setAllRecipes(keys);
    });

    function cleanup() {
      unregisterFunction();
    }
    return cleanup;
  }, []);

  console.log("AllRecipes", allRecipes);
  return (
    <div className="app">
      <Header />
      <main className="main__container">
        <div className="container">
          <div className="main">
            <Menu />
            <div className="content">
              <Routes>
                <Route path="login" exact element={<LoginPage />} />
                <Route path="profile" exact element={<Profile />} />
                <Route
                  path="registration"
                  exact
                  element={<RegistrationPage />}
                />
                <Route
                  path="/"
                  exact
                  element={<Home allRecipes={allRecipes} />}
                />
                <Route path="create-recipe" exact element={<CreateRecipe />} />
                <Route
                  path="create-product"
                  exact
                  element={<CreateProduct />}
                />
                <Route
                  path="add-diary"
                  exact
                  element={<FoodDiary allRecipes={allRecipes} />}
                />
                <Route
                  path="diary"
                  exact
                  element={<FoodDiary allRecipes={allRecipes} />}
                />
                <Route
                  path="recipes"
                  exact
                  element={<AllRecipes allRecipes={allRecipes} />}
                />
                <Route
                  path="blog"
                  exact
                  element={<Blog />}
                />
                <Route
                  path="favorites"
                  exact
                  element={<Favorites allRecipes={allRecipes} />}
                />
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
