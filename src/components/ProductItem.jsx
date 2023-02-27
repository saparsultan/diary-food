import React from "react";

const ProductItem = ({ products }) => {
  return (
    <div className="products-list">
      {products?.map((item) => (
        <div className="products-item" key={item?._id}>
          <div className="products-item__name">{item?.name}</div>
          <div className="products-item__weight">
            {item?.weight} {item?.unit}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductItem;
