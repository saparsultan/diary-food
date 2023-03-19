import React, { useState } from "react";
import { auth, database } from "../firebase-config";
import { ref, set } from "firebase/database";
import { v4 } from "uuid";
import EmptyCreate from "../components/EmptyCreate";
import ModalNotify from "../components/ModalNotify";

const CreateProduct = ({ isAuth }) => {
  const [newName, setNewName] = useState("");
  const [newWeight, setNewWeight] = useState(100);
  const [newCalories, setNewCalories] = useState(0);
  const [newProteins, setNewProteins] = useState(0);
  const [newFats, setNewFats] = useState(0);
  const [newCarbs, setNewCarbs] = useState(0);
  const [selectUnit, setSelectUnit] = useState("г(мл)");
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeUnit = (e) => {
    const valueUnit = e.target.value;
    setSelectUnit(valueUnit);
    if (valueUnit === "г(мл)") {
      setNewWeight(100);
    } else {
      setNewWeight(0);
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const createProducts = async () => {
    if (
      auth.currentUser &&
      newName !== "" &&
      newCalories >= 0 &&
      newProteins >= 0 &&
      newFats >= 0 &&
      newCarbs >= 0
    ) {
      await set(ref(database, "products/" + v4()), {
        id: v4(),
        name: newName,
        unit: selectUnit,
        weight: +newWeight,
        calories: +newCalories,
        proteins: +newProteins,
        fats: +newFats,
        carbs: +newCarbs,
      });
      handleOpenModal();
      setTimeout(() => {
        handleCloseModal();
      }, 3000);
    }
  };

  return (
    <>
      {isAuth ? (
        <>
          <div className="form-block">
            <div className="form-item">
              <label className="form-item__label">Название:</label>
              <input
                type="text"
                value={newName}
                className="form-item__input"
                placeholder="Введите название продукта"
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label className="form-item__label">Ед. измерения:</label>
              <select
                name="unit"
                id="unit"
                className="form-item__input form-item__select"
                value={selectUnit}
                onChange={handleChangeUnit}
              >
                <option disabled>Выбрать</option>
                <option value="г(мл)">100 г(мл)</option>
                <option value="Пачка">Пачка</option>
                <option value="Порция">Порция</option>
                <option value="Штука">Штука</option>
                <option value="Таблетка">Таблетка</option>
              </select>
            </div>
            {selectUnit !== "г(мл)" && (
              <div className="form-item">
                <label className="form-item__label">
                  Вес{" "}
                  {(() => {
                    switch (selectUnit) {
                      case "г(мл)":
                        return "одного г(мл)";
                      case "Пачка":
                        return "одной пачки";
                      case "Порция":
                        return "одной порции";
                      case "Штука":
                        return "одной штуки";
                      case "Таблетка":
                        return "одной таблетки";
                      default:
                        return "одного измерения";
                    }
                  })()}
                  :
                </label>
                <input
                  type="number"
                  value={newWeight}
                  className="form-item__input"
                  placeholder="г(мл)"
                  onChange={(e) => setNewWeight(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="form-block">
            <div className="form-item form-item--row">
              <label className="form-item__label">Калорийность:</label>
              <input
                type="text"
                required
                value={newCalories}
                className="form-item__input grid-col__input grid-col__input-kcal"
                placeholder="ккал"
                onChange={(e) => setNewCalories(e.target.value)}
              />
            </div>
            <div className="form-item form-item--row">
              <label className="form-item__label">Белки:</label>
              <input
                type="text"
                value={newProteins}
                className="form-item__input"
                placeholder="г"
                onChange={(e) => setNewProteins(e.target.value)}
              />
            </div>
            <div className="form-item form-item--row">
              <label className="form-item__label">Жиры:</label>
              <input
                type="text"
                value={newFats}
                className="form-item__input"
                placeholder="г"
                onChange={(e) => setNewFats(e.target.value)}
              />
            </div>
            <div className="form-item form-item--row">
              <label className="form-item__label">Углеводы:</label>
              <input
                type="text"
                value={newCarbs}
                className="form-item__input"
                placeholder="г"
                onChange={(e) => setNewCarbs(e.target.value)}
              />
            </div>
          </div>
          <div className="form-footer">
            <button
              className="btn btn--one"
              style={{ gridGap: 0 }}
              onClick={createProducts}
            >
              Создать
            </button>
          </div>
        </>
      ) : (
        <EmptyCreate />
      )}
      <ModalNotify isOpen={isOpen} onClose={handleCloseModal}>
        <p>Продукт создан</p>
      </ModalNotify>
    </>
  );
};

export default CreateProduct;
