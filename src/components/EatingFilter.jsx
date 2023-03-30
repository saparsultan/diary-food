const EatingFilter = ({ data, handleChangeEatingList }) => {
  return (
    <div className="filter">
      <div className="filter__title">
        Прием пищи
      </div>
      <div className="filter__list filter__recipe-uses">
        {data.map((item, index) => {
          return (
            <li key={item?.name + index}>
              <input
                type="checkbox"
                id={`custom-checkboxEF-${index}`}
                name={item.name}
                checked={item.check}
                value={item.name}
                onChange={handleChangeEatingList}
                readOnly
                style={{ display: "none" }}
              />
              <label
                htmlFor={`custom-checkboxEF-${index}`}
                className="btn btn--filter"
                style={
                  item.check
                    ? { backgroundColor: "#019852", color: "#fff" }
                    : {}
                }
              >
                {item?.name}
              </label>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default EatingFilter;
