import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import { auth } from "../firebase-config";
import { CREATE_BLOG } from "../utils/consts";

const Profile = () => {
  const navigate = useNavigate();
  let userName;
  let userCreation;
  let userEmail;
  if (typeof window !== "undefined") {
    userName = localStorage.getItem("user.name");
    userEmail = localStorage.getItem("user.email");
    userCreation = localStorage.getItem("user.creation");
  }

  const utcDate = new Date(userCreation);
  const creationDate = format(utcDate, "dd MMMM yyyy", { locale: ruLocale });

  const handleSignOut = async (e) => {
    e.preventDefault();
    await signOut(auth);
    localStorage.setItem("isAuth", Boolean(false));
    localStorage.removeItem("user.uid");
    localStorage.removeItem("user.name");
    localStorage.removeItem("user.email");
    localStorage.removeItem("user.creation");
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <div className="profile">
        <div className="profile__header">
          <div className="author">
            <div className="author__avatar">
              {userName && userName[0].toUpperCase()}
            </div>
            <div className="author__text">
              <div className="author__name">{userName && userName}</div>
              <div className="author__date">{creationDate}</div>
            </div>
          </div>
          <div className="profile-logout" title="Выйти" onClick={handleSignOut}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.258 16.6998C16.0746 16.4831 15.983 16.2373 15.983 15.9623C15.983 15.6873 16.0746 15.4581 16.258 15.2748L18.108 13.4248H10.933C10.6497 13.4248 10.4121 13.329 10.2205 13.1373C10.0288 12.9456 9.93298 12.7081 9.93298 12.4248C9.93298 12.1415 10.0288 11.904 10.2205 11.7123C10.4121 11.5206 10.6497 11.4248 10.933 11.4248H18.108L16.258 9.5748C16.058 9.3748 15.958 9.1373 15.958 8.8623C15.958 8.5873 16.058 8.3498 16.258 8.1498C16.4413 7.9498 16.6705 7.8498 16.9455 7.8498C17.2205 7.8498 17.4496 7.94147 17.633 8.1248L21.233 11.7248C21.333 11.8248 21.4038 11.9331 21.4455 12.0498C21.4872 12.1665 21.508 12.2915 21.508 12.4248C21.508 12.5581 21.4872 12.6831 21.4455 12.7998C21.4038 12.9165 21.333 13.0248 21.233 13.1248L17.633 16.7248C17.4163 16.9415 17.1788 17.0373 16.9205 17.0123C16.6622 16.9873 16.4413 16.8831 16.258 16.6998ZM5.93298 21.4248C5.38298 21.4248 4.91215 21.229 4.52048 20.8373C4.12882 20.4456 3.93298 19.9748 3.93298 19.4248V5.4248C3.93298 4.8748 4.12882 4.40397 4.52048 4.0123C4.91215 3.62064 5.38298 3.4248 5.93298 3.4248H11.933C12.2163 3.4248 12.4538 3.52064 12.6455 3.7123C12.8372 3.90397 12.933 4.14147 12.933 4.4248C12.933 4.70814 12.8372 4.94564 12.6455 5.1373C12.4538 5.32897 12.2163 5.4248 11.933 5.4248H5.93298V19.4248H11.933C12.2163 19.4248 12.4538 19.5206 12.6455 19.7123C12.8372 19.904 12.933 20.1415 12.933 20.4248C12.933 20.7081 12.8372 20.9456 12.6455 21.1373C12.4538 21.329 12.2163 21.4248 11.933 21.4248H5.93298Z"
                fill="#019852"
              />
            </svg>
          </div>
        </div>
        <div className="profile__main">
          <div className="profile-list">
            <div className="profile-item">
              <label>Ваше имя</label>
              <p>{userName}</p>
            </div>
            <div className="profile-item">
              <label>Ваш email</label>
              <p>{userEmail}</p>
            </div>
            <div className="profile-item">
              <label>Дата регистрации</label>
              <p>{creationDate}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="blog-create">
        <Link
        to={CREATE_BLOG}
          className="btn btn--add btn--primary"
          style={{ backgroundColor: "#019852" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 3.75V16.25M16.25 10H3.75"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ stroke: "#fff" }}
            ></path>
          </svg>
          <span style={{ color: "#fff" }}>Написать статью</span>
        </Link>
      </div>
    </>
  );
};

export default Profile;
