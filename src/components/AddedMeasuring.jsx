import React from "react";
import { Link } from "react-router-dom";
import CheckSvg from "../assets/images/check.svg";
import { MEASURING } from "../utils/consts";

const AddedMeasuring = () => {
  return (
    <div className="empty-diary">
      <img src={CheckSvg} alt="Записан" />
      <div className="empty-diary__text">
        Вес и измерения на этот день уже записан
      </div>
      <Link to={MEASURING} className="btn btn--add empty-diary__btn">
          <span>Войти</span>
        </Link>
    </div>
  );
};

export default AddedMeasuring;
