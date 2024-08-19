import React from "react";
import styles from "./Products.module.css";

type Props = {};

const Products = (props: Props) => {
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
