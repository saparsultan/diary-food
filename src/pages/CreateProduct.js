import React, {useState} from "react";
import { database } from "../firebase-config";
import { ref, set } from "firebase/database";
import { v4 } from "uuid";

const CreateProduct = () => {
  const [newName, setNewName] = React.useState("");
  const [newWeight, setNewWeight] = React.useState(100);
  const [newCalories, setNewCalories] = React.useState(0);
  const [newProteins, setNewProteins] = React.useState(0);
  const [newFats, setNewFats] = React.useState(0);
  const [newCarbs, setNewCarbs] = React.useState(0);
  const [selectUnit, setSelectUnit] = React.useState("100 г(мл)");

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

  console.log("selectUnit", selectUnit);
  console.log("newWeight", newWeight);
  console.log("newCalories", newCalories);
  console.log("newProteins", newProteins);
  console.log("ddes", newName);

  return (
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
            name=""
            id=""
            className="form-item__input form-item__select"
            value={selectUnit}
            onChange={handleChange}
          >
            <option disabled>Выбрать</option>
            <option defaultValue="100 г(мл)">
              100 г(мл)
            </option>
            <option value="Пачка">Пачка</option>
            <option value="Порция">Порция</option>
            <option value="Штука">Штука</option>
            <option value="Таблетка">Таблетка</option>
          </select>
        </div>
        {selectUnit !== "100 г(мл)" ? (
          <div className="form-item">
            <label className="form-item__label">
              Вес{" "}
              {(() => {
                switch (selectUnit) {
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
        ) : (
          ""
        )}
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
      <div className="footer">
        <button className="btn" style={{ gridGap: 0 }} onClick={createProducts}>
          Добавить
        </button>
      </div>
    </>
  );
};

export default CreateProduct;
