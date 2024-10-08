import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  deleteProduct,
  getAllProducts,
} from "../../products/slices/products-slices";
import ProductCard from "../../components/ProductCard/ProductCard";
import ModalAddProduct from "../../components/ModalProduct/ModalAddProduct";
import ModalEditProduct from "../../components/ModalProduct/ModalEditProduct";

type Props = {};

const Products = (props: Props) => {
  const [query, setQuery] = useState<String>("");
  const dispatch: AppDispatch = useDispatch();

  const { products } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleDelete = (id: string): void => {
    dispatch(deleteProduct(id));
  };

  const filteredProducts = query
    ? products.filter((product) => {
        return product.title.toLowerCase().includes(query.toLowerCase());
      })
    : products;

  return (
    <div className={styles.productsContainer}>
      <div className={styles.searchContainer}>
        <input
          type='search'
          placeholder='Pesquisar produto...'
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <header className={styles.header}>
        <h2>Itens cadastrados:</h2>

        <ModalAddProduct />
      </header>

      <div className={styles.productsList}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard product={product} handleDelete={handleDelete} />
          ))
        ) : (
          <h1>Não há itens cadastrados...</h1>
        )}
      </div>
    </div>
  );
};

export default Products;
