const CaloriesFilter = ({
  calories1,
  calories2,
  handleCalories1,
  handleCalories2,
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
            value={calories1}
            onChange={(e) => handleCalories1(e.target.value)}
          />
          <span>—</span>
          <input
            type="number"
            className="form-item__input"
            placeholder="0"
            value={calories2}
            onChange={(e) => handleCalories2(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default CaloriesFilter;
