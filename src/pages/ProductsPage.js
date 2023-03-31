import React, { useState, useEffect } from "react";
import { ref, onValue, set, remove } from "firebase/database";
import { auth, database } from "../firebase-config";
import SelectDate from "../components/SelectDate";
import SelectEating from "../components/SelectEating";
import EmptyAdd from "../components/EmptyAdd";
import doneSvg from "../assets/images/done.svg";

const ProductsPage = ({ allRecipes }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [eating, setEating] = useState("breakfast");
  const [diaryFoodName, setDiaryFoodName] = useState(null);
  const [shopProducts, setShopProducts] = useState([]);

  useEffect(() => {
    const foodDiary = ref(
      database,
      `diary/${auth?.currentUser?.uid}/${startDate
        .toString()
        .slice(0, 15)}/${eating}`
    );
    const unregisterFunction = onValue(foodDiary, (snapshot) => {
      const newValObj = snapshot.val();
      const newObjKeys = newValObj ? Object.keys(newValObj) : [];
      const newObjArray = newObjKeys.map((keyString) => {
        return newValObj[keyString];
      });
      setDiaryFoodName(newObjArray);
    });

    function cleanup() {
      unregisterFunction();
    }
    return cleanup;
  }, [startDate, eating]);

  useEffect(() => {
    const shopProducts = ref(database, `shop/${auth?.currentUser?.uid}`);
    const unregisterFunction = onValue(shopProducts, (snapshot) => {
      const newValObj = snapshot.val();
      if (newValObj) {
        const keys = Object.keys(newValObj);
        const newObjArray = keys.map((keyString) => {
          return newValObj[keyString];
        });
        setShopProducts(newObjArray);
      }
    });

    function cleanup() {
      unregisterFunction();
    }
    return cleanup;
  }, [startDate, eating]);

  const handleSelectDate = (value) => {
    setStartDate(value);
  };
  const handleChangeEating = (value) => {
    setEating(value.target.value);
  };

  const newAllRecipesFunc = () => {
    const data = allRecipes?.filter((row) => diaryFoodName?.includes(row[0]));
    return data;
  };
  const newAllRecipes = newAllRecipesFunc();

  const handleDoneProduct = async (id) => {
    if (auth?.currentUser) {
      const doneProductRef = ref(
        database,
        `shop/${auth?.currentUser?.uid}/${id}`
      );
      await set(doneProductRef, id);
    }
  };

  const deleteDoneProduct = async (id) => {
    if (auth?.currentUser) {
      const doneProductRef = ref(
        database,
        `shop/${auth?.currentUser?.uid}/${id}`
      );
      await remove(doneProductRef);
      setShopProducts(shopProducts.filter((item) => item !== id));
    }
  };

  return (
    <>
      <div className="content__wrap">
        <SelectDate selected={startDate} handleSelectDate={handleSelectDate} />
        <SelectEating value={eating} handleChangeEating={handleChangeEating} />
        {newAllRecipes.length ? (
          <div className="shop-list">
            {newAllRecipes.map((data, index) => (
              <div className="shop-item" key={data[0] + index}>
                <div className="shop-item__title">{data[1].name}</div>
                <div className="shop-products">
                  {data[1].products.map(({ id, name, weight, unit }) => (
                    <div className="shop-product" key={id}>
                      {shopProducts.length > 0 && shopProducts.includes(id) ? (
                        <div
                          className="shop-product__change shop-product__done"
                          onClick={() => deleteDoneProduct(id)}
                        >
                          <img src={doneSvg} alt="Галочка" />
                        </div>
                      ) : (
                        <div
                          className="shop-product__change shop-product__check"
                          onClick={() => handleDoneProduct(id)}
                        ></div>
                      )}
                      <div className="shop-product__name">{name}</div>
                      <div className="shop-product__line"></div>
                      <div className="shop-product__sum">
                        <span>{weight}</span>&nbsp;
                        <span>{unit.toLowerCase()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyAdd eating={eating} />
        )}
      </div>
    </>
  );
};

export default ProductsPage;
