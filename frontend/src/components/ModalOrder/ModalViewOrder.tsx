import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormEvent, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { IOrder } from "../../orders/interfaces/IOrder";
import styles from "./ModalViewOrder.module.css";
import { getProductById } from "../../products/slices/products-slices";
import { IOrderItem } from "../../orders/interfaces/IOrderItem";
import { IProduct } from "../../products/interfaces/IProduct";
const style = {
  color: "#000",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type Props = {
  iconView: React.ReactNode;
  order: IOrder;
};

export default function ModalViewOrder({ iconView, order }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch: AppDispatch = useDispatch();
  const [orderItems, SetOrderItems] = useState<IOrderItem[]>([]);
  const [productItem, setProductItem] = useState<IProduct[]>([]);

  const fetchProductById = async (id: string) => {
    const product = await dispatch(getProductById(id));
    return product.payload;
  };

  console.log("a", order.orderItems[0].idProduct.title);
  // const fillOrderItems = async () => {
  //   await Promise.all(
  //     order.orderItems.map(async (orderItem) => {
  //       const product = await fetchProductById(orderItem.idProduct);
  //       setProductItem(product as IProduct);
  //     })
  //   );
  // };

  // const fillOrderItems = async () => {
  //   SetOrderItems(order.orderItems);

  //   // console.log("orders", orderItems);

  //   const products = await Promise.all(
  //     orderItems.map(async (orderItem) => {
  //       const product = await fetchProductById(orderItem.idProduct);

  //       // orderItem.product = product
  //       // console.log("a", orderItem.product);
  //       // orderItem.product = product as IProduct;
  //       return product as IProduct; // Aqui garantimos que `product` seja do tipo `IProduct`
  //     })
  //   );
  //   setProductItem(products);
  //   // SetOrderItems(order.orderItems);
  // };

  // useEffect(() => {
  //   fillOrderItems();
  // }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // const orderData = {
    //   _id: order._id,
    //   title: title,
    //   quantity: quantity,
    //   price: price,
    // };
    // dispatch(editorder(orderData));
    // console.log(orderData);
    // handleClose();
  };

  return (
    <div>
      <div onClick={handleOpen} style={{ cursor: "pointer" }}>
        {iconView}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Cliente: {order.customer}
          </Typography>
          <div className={styles.orderItems}>
            <h4>Pedidos:</h4>
            {order.orderItems.map((orderItem, index) => (
              <p>
                {orderItem.idProduct.title} - <span>{orderItem.quantity}</span>
              </p>
            ))}
            <h4>Valor: R${order.totalPrice}</h4>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
