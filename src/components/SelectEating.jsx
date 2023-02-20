const SelectEating = ({ value, handleChangeEating }) => {
  return (
    <div className="eating-list" onChange={handleChangeEating}>
      <input
        id="e-breakfast"
        type="radio"
        value="breakfast"
        name="breakfast"
        checked={value === "breakfast"}
        readOnly
      />
      <label
        htmlFor="e-breakfast"
        className={
          value === "breakfast"
            ? "eating-list__item eating-list__item--active"
            : "eating-list__item"
        }
      >
        Завтрак
      </label>
      <input
        id="e-lunch"
        type="radio"
        value="lunch"
        name="lunch"
        checked={value === "lunch"}
        readOnly
      />
      <label
        htmlFor="e-lunch"
        className={
          value === "lunch"
            ? "eating-list__item eating-list__item--active"
            : "eating-list__item"
        }
      >
        Обед
      </label>
      <input
        id="e-dinner"
        type="radio"
        value="dinner"
        name="dinner"
        checked={value === "dinner"}
        readOnly
      />
      <label
        htmlFor="e-dinner"
        className={
          value === "dinner"
            ? "eating-list__item eating-list__item--active"
            : "eating-list__item"
        }
      >
        Ужин
      </label>
    </div>
  );
};

export default SelectEating;
