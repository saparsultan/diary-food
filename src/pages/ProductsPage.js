import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import { database } from "../firebase-config";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const data = ref(database, "products");
    const unregisterFunction = onValue(data, (snapshot) => {
      const newValObj = snapshot.val();
      const keys = Object.keys(newValObj);
      const newObjArray = keys.map((keyString) => {
        return newValObj[keyString];
      });
      setProducts(newObjArray);
    });

    function cleanup() {
      unregisterFunction();
    }
    return cleanup;
  }, []);

  return (
    <div className="products">
      <ProductItem products={products} />
    </div>
  );
};

export default ProductsPage;
