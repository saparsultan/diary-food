import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue, limitToLast, query } from "firebase/database";
import { auth, database } from "./firebase-config";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Header from "./components/Header";
import Menu from "./components/Menu";
import CreateProduct from "./pages/CreateProduct";
import CreateRecipe from "./pages/CreateRecipe";
import FoodDiary from "./pages/FoodDiary";
import Favorites from "./pages/Favorites";
import RecipePage from "./pages/RecipePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AllBlogs from "./pages/AllBlogs";
import Profile from "./pages/Profile";
import ProductsPage from "./pages/ProductsPage";
import CreateBlog from "./pages/CreateBlog";
import Measuring from "./pages/Measuring";
import Footer from "./components/Footer";
import AddMeasuring from "./pages/AddMeasuring";
import BlogPage from "./pages/BlogPage";
import {
  ABOUT,
  ADD_MEASURING,
  BLOGS,
  BLOG_PAGE,
  CREATE_BLOG,
  CREATE_RECIPE,
  FAVORITES,
  HOME,
  LANDING,
  LOGIN,
  MEASURING,
  PRODUCTS,
  PROFILE,
  RECIPES,
  RECIPE_PAGE,
  REGISTRATION,
} from "./utils/consts";
import About from "./pages/About";

function App() {
  const { pathname } = useLocation();
  const withFilter = pathname === RECIPES || pathname === HOME ? true : false;
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
      } else {
        localStorage.setItem("isAuth", Boolean(false));
        return;
      }
    });
    return () => unsubscribe();
  }, []);

  let limitNumber = 100;

  useEffect(() => {
    const recipes = ref(database, "recipes");
    const lastTenArticlesQuery = query(recipes, limitToLast(limitNumber));
    const unregisterFunction = onValue(lastTenArticlesQuery, (snapshot) => {
      const newValObj = snapshot.val();
      const keys = Object.entries(newValObj);
      setAllRecipes(keys);
    });

    function cleanup() {
      unregisterFunction();
    }
    return cleanup;
  }, [limitNumber]);

  return (
    <div className="app">
      <Routes>
        <Route path={LANDING} exact element={<Landing />} />
      </Routes>
      {pathname !== LANDING && (
        <>
          <Header withFilter={withFilter} />
          <main className="main__container">
            <div
              className="container"
              style={withFilter ? { maxWidth: "1226px" } : {}}
            >
              <div
                className="main"
                style={
                  withFilter ? { gridTemplateColumns: "200px 1fr 240px" } : {}
                }
              >
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
                    <Route path={ABOUT} exact element={<About />} />
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
                      path={RECIPES}
                      exact
                      element={<FoodDiary allRecipes={allRecipes} />}
                    />
                    <Route path={PRODUCTS} exact element={<ProductsPage allRecipes={allRecipes} />} />
                    <Route path={BLOGS} exact element={<AllBlogs />} />
                    <Route path={BLOG_PAGE} exact element={<BlogPage />} />
                    <Route path={FAVORITES} exact element={<Favorites />} />
                    <Route path={MEASURING} exact element={<Measuring />} />
                    <Route path={RECIPE_PAGE} element={<RecipePage />} />
                  </Routes>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
