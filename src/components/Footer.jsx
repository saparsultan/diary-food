import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo-primary.svg";
import { ABOUT, BLOGS, RECIPES } from '../utils/consts';

const Footer = () => {
  return (
    <div className="footer__container">
      <div className="container">
        <div className="footer">
          <Link to="/" className="header__logo logo">
              <img src={logo} alt="My food diary" />
          </Link>
          <ul className="footer-list">
            <li>
              <Link to={ABOUT}>
                О сервисе
              </Link>
            </li>
            <li>
              <Link to={RECIPES}>
                Все рецепты
              </Link>
            </li>
            <li>
              <Link to={BLOGS}>
                Статьи
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer