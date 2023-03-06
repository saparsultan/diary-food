import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { ref as refDatabase, set, onValue, serverTimestamp } from "firebase/database";
import { storage, database, auth } from "../firebase-config";
import recipeUses from "../data/recipeUses";
import categoriesDishes from "../data/categoriesDishes";
import EmptyCreate from "../components/EmptyCreate";

const CreateRecipe = ({isAuth}) => {
  const [allProducts, setAllProducts] = React.useState([]);
  const [newName, setNewName] = React.useState("");
  const [category, setCategory] = React.useState("Все тиы блюд");
  const [recipeUsesValue, setRecipeUsesValue] = React.useState([]);
  const [newDescription, setNewDescription] = React.useState("");
  const [newMethods, setNewMethods] = React.useState("");
  const [imageUpload, setImageUpload] = React.useState();
  const [selectProduct, setSelectProduct] = React.useState([]);
  const [amountWeight, setAmountWeight] = React.useState(0);
  const [recipeProduct, setRecipeProduct] = React.useState([]);

  console.log("recipeProduct", recipeProduct)
  React.useEffect(() => {
    const productsRef = refDatabase(database, "products");
    const unregisterFunction = onValue(productsRef, (snapshot) => {
      const newValObj = snapshot.val();
      const keys = Object.keys(newValObj);
      const newObjArray = keys.map((keyString) => {
        return newValObj[keyString];
      });
      setAllProducts(newObjArray);
      setSelectProduct(newObjArray[0])
    });
    function cleanup() {
      unregisterFunction();
      recipeUses.map((item) => setRecipeUsesValue((pre) => [...pre, item]));
    }
    return cleanup;
  }, []);

  const handleProducts = (e) => {
    return allProducts
      .filter((row) => row.name === e.target.value)
      .map((row) => setSelectProduct(row));
  };

  const changeAmountWeight = ({ target }) => {
    let { value, min } = target;
    value = Math.max(Number(min), Math.min(Number(value)));
    setAmountWeight(value);
  };

  const uniqueProducts = [...new Set(allProducts.map((item) => item))];
  const optionProducts = uniqueProducts.map((product, id) => {
    return (
      <option key={product?.name + id} value={product?.name}>
        {product?.name}
      </option>
    );
  });


  const optionCategoriesDishes = categoriesDishes.map((category, id) => {
    return (
      <option key={category?.id + id} value={category?.value}>
        {category?.name}
      </option>
    );
  });

  const handleChangeRecipeUses = (e) => {
    const { value, checked } = e.target;
    return setRecipeUsesValue((pre) =>
      pre.map((item) =>
        item.name === value ? { ...item, check: checked } : item
      )
    );
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageUpload(e.target.files[0]);
    }
  };

  const addProduct = (e) => {
    e.preventDefault();
    if (selectProduct !== null && amountWeight > 0) {
      const newObj = selectProduct;
      newObj.amount = amountWeight;
      newObj._id = v4();
      setRecipeProduct((pre) => [...pre, newObj]);
      setSelectProduct(null);
    }
  };

  const deleteProduct = (id) => {
    setRecipeProduct(recipeProduct.filter((obj) => obj._id !== id));
  };

  const removeSelectedImage = (e) => {
    e.preventDefault();
    setImageUpload();
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    if(isAuth && newName !== "" && recipeProduct.length > 0 && newDescription !== "" && newMethods !== "" && imageUpload) {
      await uploadBytesResumable(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) =>
        set(refDatabase(database, "recipes/" + v4()), {
          name: newName,
          category: category,
          products: recipeProduct,
          description: newDescription,
          image: url,
          isOnion: recipeUsesValue[0].check,
          isMilk: recipeUsesValue[1].check,
          isEggs: recipeUsesValue[2].check,
          isPig: recipeUsesValue[3].check,
          isFish: recipeUsesValue[4].check,
          isAlcohol: recipeUsesValue[5].check,
          author: {
            uid: auth?.currentUser?.uid,
            name: auth?.currentUser?.displayName,
          },
          createdAt: serverTimestamp()
        })
        );
      });
    }
  };

  return (
    <>
    {
      isAuth ? <>
            <Tabs>
        <TabList>
          <Tab>Состав</Tab>
          <Tab>Описание</Tab>
        </TabList>
        <TabPanel>
          <div className="form-block">
            <div className="form-item">
              <label className="form-item__label">Название:</label>
              <input
                type="text"
                value={newName}
                className="form-item__input"
                placeholder="Введите название блюда"
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label className="form-item__label">Категория:</label>
              <select
                name="category"
                id="category_dishes"
                className="form-item__input form-item__select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {optionCategoriesDishes}
              </select>
            </div>
            <div className="form-item">
              <label className="form-item__label">
                В рецепте используются:
              </label>
              <ul className="recipe-uses">
                {recipeUsesValue.map((item, index) => {
                  return (
                    <li key={item.name + index}>
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={item.name}
                        checked={item.check}
                        value={item.name}
                        onChange={handleChangeRecipeUses}
                      />
                      <label htmlFor={`custom-checkbox-${index}`}>
                        {item.name}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="form-block">
            <div className="form-title">Ингредиенты</div>
            {recipeProduct.length > 0 && (
              <ul className="form-item recipe-products">
                {recipeProduct.map((product, index) => (
                  <li key={product.name + index}>
                    <span>{product.name}</span>
                    <span>{`${product.amount} ${product.unit}`}</span>
                    <span className="recipe-products__delete" onClick={() => deleteProduct(product?._id)}>
                      Удалить х
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="form-item">
              <div className="form-item__content">
                <div className="form-item__content-col">
                  <label className="form-item__label">Название:</label>
                  <select
                    name="select-product"
                    id="selectProduct"
                    className="form-item__input form-item__select"
                    value={selectProduct?.name}
                    onChange={handleProducts}
                  >
                    {optionProducts}
                  </select>
                </div>
                <div className="form-item__content-col">
                  <label className="form-item__label">Количеcтво:</label>
                  <div className="form-item__addition">
                    <input
                      type="number"
                      className="form-item__input form-item__input--weight"
                      value={amountWeight}
                      min="0"
                      onChange={changeAmountWeight}
                    />
                    <span className="form-item__input form-item__unit">
                      {selectProduct?.unit ? selectProduct?.unit : "г(мл)"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-footer">
              <button className="btn btn--add" onClick={addProduct}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 3.75V16.25M16.25 10H3.75"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Добавить</span>
              </button>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="form-block">
            <div className="form-item">
              <label className="form-item__label">Описание рецепта:</label>
              <textarea
                type="text"
                value={newDescription}
                name="desc"
                required
                className="form-item__input"
                placeholder="Заполните краткое описание рецепта"
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label className="form-item__label">Метод приготовления:</label>
              <textarea
                type="text"
                value={newMethods}
                name="methods"
                required
                className="form-item__input"
                placeholder="Опишите метод приготовления"
                onChange={(e) => setNewMethods(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label className="form-item__label">Основная фотография:</label>
              <div className="form-item__img-block">
                {imageUpload === undefined && (
                  <>
                    <label
                      htmlFor="toUploadAPicture"
                      className="btn btn--upload"
                      style={{ textAlign: "center" }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 9V15M15 12H9M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                          stroke="#019852"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Добавить фото
                    </label>
                    <input
                      id="toUploadAPicture"
                      accept="image/*"
                      type="file"
                      onChange={onFileChange}
                      style={{ display: "none" }}
                    />
                  </>
                )}

                {imageUpload && (
                  <div className="form-item__img-wrap">
                    <div className="form-item__img-prev">
                      <img
                        src={URL.createObjectURL(imageUpload)}
                        alt={imageUpload.name}
                      />
                    </div>
                    <button className="btn" onClick={removeSelectedImage}>
                      Удалить
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>

      <div className="form-footer">
        <button className="btn btn--one" onClick={onSubmit}>
          Создать
        </button>
      </div>
      </> : <EmptyCreate/>
    }
    </>
  );
};

export default CreateRecipe;
