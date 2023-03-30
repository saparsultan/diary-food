import { push, ref, set } from "firebase/database";
import React from "react";
import { auth, database } from "../firebase-config";
import SelectDate from "./SelectDate";
import SelectEating from "./SelectEating";

const ModalAddDiary = ({ isOpen, onClose, item }) => {
  const [startDate, setStartDate] = React.useState(new Date());
  const [eating, setEating] = React.useState("breakfast");

  if (!isOpen) {
    return null;
  }

  const handleSelectDate = (value) => {
    setStartDate(value);
  };

  const handleChangeEating = (value) => {
    setEating(value.target.value);
  };

  const confirmAddDiary = (e) => {
    e.preventDefault();
    const eatingRef = ref(
      database,
      `diary/${auth?.currentUser?.uid}/${startDate
        ?.toString()
        .slice(0, 15)}/${eating}/${item}`
    );
    set(eatingRef, item);
    onClose();
  };

  return (
    <div className="modal modal-diary">
      <div className="modal-diary__content">
        <div className="modal-diary__title">Добавить в дневник</div>
        <SelectDate selected={startDate} handleSelectDate={handleSelectDate} />
        <div className="modal-diary__eating">
          <div className="modal-diary__eating--title">
            Выберите время приема пищи
          </div>
          <div className="modal-diary__eating--wrap">
            <SelectEating
              value={eating}
              handleChangeEating={handleChangeEating}
            />
          </div>
        </div>
        <div className="modal-diary__footer">
          <button className="btn btn--one modal-btn" onClick={confirmAddDiary}>
            Сохранить
          </button>
          <button
            className="btn btn--one modal-btn modal-cancel"
            onClick={onClose}
          >
            Отмена
          </button>
        </div>
      </div>
      <button className="modal-close" onClick={onClose}>
        x
      </button>
    </div>
  );
};

export default ModalAddDiary;
