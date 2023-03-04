import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  getDatabase,
  ref,
  onValue,
  limitToLast,
  query,
} from "firebase/database";
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
import AllBlogs from "./pages/AllBlogs";
import Profile from "./pages/Profile";
import ProductsPage from "./pages/ProductsPage";
import CreateBlog from "./pages/CreateBlog";
import {
  ADD_DIARY,
  ADD_MEASURING,
  BLOGS,
  CREATE_BLOG,
  CREATE_RECIPE,
  FAVORITES,
  HOME,
  LOGIN,
  MEASURING,
  PRODUCTS,
  PROFILE,
  RECIPES,
  RECIPE_PAGE,
  REGISTRATION,
} from "./utils/consts";
import Measuring from "./pages/Measuring";
import Footer from "./components/Footer";
import AddMeasuring from "./pages/AddMeasuring";

function App() {
  const isAuthValue = localStorage.getItem("isAuth");
  const isAuthBooleanValue = JSON.parse(isAuthValue);
  const [isAuth, setIsAuth] = useState(false);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    setIsAuth(isAuthBooleanValue);
  }, [isAuthBooleanValue]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("isAuth", true);
        localStorage.setItem("user.uid", user?.uid);
        localStorage.setItem("user.email", user?.email);
        localStorage.setItem("user.name", user?.displayName);
        localStorage.setItem("user.creation", user?.metadata?.creationTime);
        console.log("user", user);
      } else {
        localStorage.setItem("isAuth", Boolean(false));
        return;
      }
    });
    return () => unsubscribe();
  }, []);

  let limitNumber = 5;

  useEffect(() => {
    const db = getDatabase();
    const recipes = ref(db, "recipes");
    const lastTenArticlesQuery = query(recipes, limitToLast(limitNumber));
    const unregisterFunction = onValue(lastTenArticlesQuery, (snapshot) => {
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
  }, [limitNumber]);

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
                <Route path={LOGIN} exact element={<LoginPage />} />
                {isAuth && (
                  <>
                    <Route path={PROFILE} exact element={<Profile />} />
                    <Route
                      path={ADD_MEASURING}
                      exact
                      element={<AddMeasuring />}
                    />
                  </>
                )}
                <Route
                  path={REGISTRATION}
                  exact
                  element={<RegistrationPage />}
                />
                <Route
                  path={HOME}
                  exact
                  element={<Home allRecipes={allRecipes} />}
                />
                <Route
                  path={CREATE_RECIPE}
                  exact
                  element={<CreateRecipe isAuth={isAuth} />}
                />
                <Route
                  path="create-product"
                  exact
                  element={<CreateProduct isAuth={isAuth} />}
                />
                <Route path={CREATE_BLOG} exact element={<CreateBlog />} />
                <Route
                  path={ADD_DIARY}
                  exact
                  element={<FoodDiary allRecipes={allRecipes} />}
                />
                <Route
                  path={RECIPES}
                  exact
                  element={<AllRecipes allRecipes={allRecipes} />}
                />
                <Route path={PRODUCTS} exact element={<ProductsPage />} />
                <Route path={BLOGS} exact element={<AllBlogs />} />
                <Route path={FAVORITES} exact element={<Favorites />} />
                <Route path={MEASURING} exact element={<Measuring />} />
                <Route path={RECIPE_PAGE} element={<RecipePage />} />
              </Routes>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
