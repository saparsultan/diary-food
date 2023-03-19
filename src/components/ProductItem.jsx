import React from "react";

const ProductItem = ({ products }) => {
  return (
    <div className="products-list">
      {products?.map((item, i) => (
        <div className="products-item" key={item?.name + i}>
          <div className="products-item__name">{item?.name}</div>
          <div className="products-item__weight">
            {item?.amount} {item?.unit.toLowerCase()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductItem;
