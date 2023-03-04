import React, { useState } from "react";
import { database } from "../firebase-config";
import { ref, set } from "firebase/database";
import { v4 } from "uuid";
import EmptyCreate from "../components/EmptyCreate";

const CreateProduct = ({isAuth}) => {
  const [newName, setNewName] = useState("");
  const [newWeight, setNewWeight] = useState(100);
  const [newCalories, setNewCalories] = useState(0);
  const [newProteins, setNewProteins] = useState(0);
  const [newFats, setNewFats] = useState(0);
  const [newCarbs, setNewCarbs] = useState(0);
  const [selectUnit, setSelectUnit] = useState("г(мл)");

  const handleChange = (e) => {
    setSelectUnit(e.target.value);
  };

  const createProducts = async () => {
    set(ref(database, "products/" + v4()), {
      id: v4(),
      name: newName,
      unit: selectUnit,
      weight: newWeight,
      calories: newCalories,
      proteins: newProteins,
      fats: newFats,
      carbs: newCarbs,
    });
  };

  return (
    <>
    {
      isAuth ? <>
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
            name=""
            id=""
            className="form-item__input form-item__select"
            value={selectUnit}
            onChange={handleChange}
          >
            <option disabled>Выбрать</option>
            <option defaultValue="г(мл)">г(мл)</option>
            <option value="Пачка">Пачка</option>
            <option value="Порция">Порция</option>
            <option value="Штука">Штука</option>
            <option value="Таблетка">Таблетка</option>
          </select>
        </div>
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
      </div>
      <div className="form-block">
        <div className="form-item form-item--row">
          <label className="form-item__label">Калорийность:</label>
          <input
            type="text"
            value={newCalories}
            className="form-item__input"
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
        <button className="btn btn--one" style={{ gridGap: 0 }} onClick={createProducts}>
          Создать
        </button>
      </div>
      </> : <EmptyCreate />
    }
    </>
  );
};

export default CreateProduct;
