import categoriesDishes from "../data/categoriesDishes";

const CategoryFilter = ({ category, handleCategory }) => {
  const optionCategoriesDishes = categoriesDishes.map((category, id) => {
    return (
      <option key={category?.id + id} value={category?.value}>
        {category?.name}
      </option>
    );
  });

  return (
    <div className="filter" style={{ paddingBottom: "24px" }}>
      <div className="filter__title">Тип блюда</div>
      <select
        name="select-product"
        id="selectProduct"
        className="form-item__input form-item__select"
        value={category}
        onChange={(e) => handleCategory(e.target.value)}
      >
        {optionCategoriesDishes}
      </select>
    </div>
  );
};

export default CategoryFilter;
