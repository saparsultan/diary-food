import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile 
} from "firebase/auth";
import { auth } from "../firebase-config";
import { Link } from "react-router-dom";
import { HOME } from "../utils/consts";

const Login = ({ type }) => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuthorization = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("userCredential", userCredential);
        localStorage.setItem("user", JSON.stringify(userCredential.user));
        navigate(`${HOME}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName });
      navigate(`${HOME}`);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login__container">
      <div className="login__title">
        {
          type === "authorization" ? "Авторизация" : "Регистрация"
        }
      </div>
      <form
        onSubmit={
          type === "authorization" ? handleAuthorization : handleRegistration
        }
        className="login"
      >
        <div className="login__item">
          <label>Имя:</label>
          <input
            type="text"
            required
            placeholder="Введите ваше имя"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="login__item">
          <label>Email:</label>
          <input
            type="email"
            required
            placeholder="Введите ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login__item">
          <label>Password:</label>
          <input
            type="password"
            required
            placeholder="Введите ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login__btn">
          Войти
        </button>
        <div className="login__link">
          {type === "authorization" ? (
            <>
              <span>Нет аккаунта?</span>
              <Link to={"/registration"}> Зарегистрироваться</Link>
            </>
          ) : (
            <>
              <span>Уже есть аккаунт?</span>
              <Link to={"/login"}> Авторизоваться</Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
