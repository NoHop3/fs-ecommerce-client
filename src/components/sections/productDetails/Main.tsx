import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { RootState } from "../../../typescript/redux/store";
import { Product } from "../../../typescript/types";

export const Main = () => {
  const { productId } = useParams();
  const { products } = useSelector((state: RootState) => state.productState);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  useEffect(() => {
    const result = products.find((product) => product._id === productId);
    if (result !== undefined) setSelectedProduct(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
  return (
    <main>
      <div className='details__wrapper'>
        {selectedProduct && selectedProduct ? (
          <div className='details__wrapper__information'>
            <div className='details__wrapper__information--img'>
              <img
                src={selectedProduct.image}
                alt='Overview of the selected product'
              />
            </div>
            <div className='details__wrapper__information--description'>
              <h3>{selectedProduct.name}</h3>
            </div>
          </div>
        ) : (
          <div className='error'>{error}</div>
        )}
      </div>
    </main>
  );
};
