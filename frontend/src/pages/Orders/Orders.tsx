import React, { useEffect, useState } from "react";
import styles from "./Orders.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  deleteProduct,
  getAllProducts,
} from "../../products/slices/products-slices";
import ProductCard from "../../components/ProductCard/ProductCard";
import ModalAddProduct from "../../components/ModalProduct/ModalAddProduct";
import ModalEditProduct from "../../components/ModalProduct/ModalEditProduct";
import { getAllOrders } from "../../orders/slices/orders-slices";
import OrderCard from "../../components/OrderCard/OrderCard";

type Props = {};

const Orders = (props: Props) => {
  const [query, setQuery] = useState<String>("");
  const dispatch: AppDispatch = useDispatch();

  const { orders } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleDelete = (id: string): void => {
    dispatch(deleteProduct(id));
  };

  // const filteredOrders = query
  //   ? orders.filter((order) => {
  //       return order.title.toLowerCase().includes(query.toLowerCase());
  //     })
  //   : Orders;

  return (
    <div className={styles.OrdersContainer}>
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

      <div className={styles.OrdersList}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard order={order} handleDelete={handleDelete} />
          ))
        ) : (
          <h2>Não há pedidos registrados...</h2>
        )}
      </div>
    </div>
  );
};

export default Orders;
