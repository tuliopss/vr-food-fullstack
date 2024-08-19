import React, { useEffect } from "react";
import styles from "./Products.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getAllProducts } from "../../products/slices/products-slices";

type Props = {};

const Products = (props: Props) => {
  // const dispatch = useDispatch();
  const dispatch: AppDispatch = useDispatch();

  const { products } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
    console.log(products);
  }, [dispatch]);

  return (
    <div className={styles.productsContainer}>
      <header className={styles.header}>
        <h2>Itens cadastrados</h2>
        <button>Cadastrar novo item</button>
      </header>

      <div className={styles.productsList}>
        <div>Salgado</div>
        <div>Salgado</div>
        <div>Salgado</div>
        <div>Salgado</div>
        <div>Salgado</div>
      </div>
    </div>
  );
};

export default Products;
