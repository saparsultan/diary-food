const RecipeUsesFilter = ({ data, handleChangeRecipeUses }) => {
  return (
    <div className="filter">
      <div className="filter__title">
        Не включать
        <br /> в рецепт пищевые аллергеныы
      </div>
      <div className="filter__list filter__recipe-uses">
        {data.map((item, index) => {
          return (
            <li key={item.id + index}>
              <input
                type="checkbox"
                id={`custom-checkbox-${index}`}
                name={item.name}
                checked={item.check}
                value={item.name}
                onChange={handleChangeRecipeUses}
                style={{ display: "none" }}
              />
              <label
                htmlFor={`custom-checkbox-${index}`}
                className="btn btn--filter"
                style={
                  item.check
                    ? { backgroundColor: "#019852", color: "#fff" }
                    : {}
                }
              >
                {item.name}
              </label>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeUsesFilter;
