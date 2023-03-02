import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { Link } from "react-router-dom";
import { HOME, LOGIN } from "../utils/consts";
import ErrorMessage from "./ErrorMessage";

const Login = ({ type }) => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorCheck, setErrorCheck] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const handleAuthorization = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(`${HOME}`);
      window.location.reload();
    } catch (error) {
      console.error(error.message);
      setErrorCheck(true);
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        setErrorMessage("Неверный логин или пароль.");
      }
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName });
      navigate(`${LOGIN}`);
      window.location.reload();
    } catch (error) {
      setErrorCheck(true);
      console.error(error.message);
      if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setErrorPassword("Пароль должен быть не менее 6 символов");
      }
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setErrorEmail("Этот электронный адрес уже занят");
      }
    }
  };

  return (
    <div className="login__container">
      <div className="login__title">
        {type === "authorization" ? "Авторизация" : "Регистрация"}
      </div>
      <form
        onSubmit={
          type === "authorization" ? handleAuthorization : handleRegistration
        }
        className="login"
      >
        {type === "registration" && (
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
        )}
        {errorMessage && <ErrorMessage message={errorMessage} type="auth" />}
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
        {errorEmail && <ErrorMessage message={errorEmail} />}
        <div className="login__item">
          <label>Пароль:</label>
          <input
            type="password"
            required
            placeholder="Введите ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorPassword && <ErrorMessage message={errorPassword} />}
        <button type="submit" className="login__btn">
          {type === "authorization" ? "Войти" : "Создать аккаунт"}
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
