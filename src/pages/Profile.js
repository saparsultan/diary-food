import React from "react";

const Profile = () => {
  const userName = localStorage.getItem("user.name")
  const userAvatar = userName[0].toUpperCase();
  return (
    <div className="profile">
      <div className="profile__header">
        <div class="author">
          <div class="author__avatar">{userAvatar}</div>
          <div class="author__text">
            <div class="author__name">{userName}</div>
            <div class="author__date">26.01.2023</div>
          </div>
        </div>
      </div>
      <div className="profile__main">
        <div className="profile-list">
          <div className="profile-item">
            <label>Ваше имя</label>
            <p>Айгерим</p>
          </div>
          <div className="profile-item">
            <label>Ваш email</label>
            <p>Айгерим</p>
          </div>
          <div className="profile-item">
            <label>Дата регистрации</label>
            <p>26.01.2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
