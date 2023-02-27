const CaloriesFilter = ({
  minCalories,
  maxCalories,
  handleChangeMinCalories,
  handleChangeMaxCalories,
}) => {
  return (
    <>
      <div className="filter" style={{ paddingBottom: "24px" }}>
        <div className="filter__title">Калорийность</div>
        <div className="filter-calories">
          <input
            type="number"
            className="form-item__input"
            placeholder="0"
            min="0"
            value={minCalories}
            onChange={handleChangeMinCalories}
          />
          <span>—</span>
          <input
            type="number"
            className="form-item__input"
            placeholder="0"
            min="0"
            value={maxCalories}
            onChange={handleChangeMaxCalories}
          />
        </div>
      </div>
    </>
  );
};

export default CaloriesFilter;
