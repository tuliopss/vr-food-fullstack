import styles from "./OrderCard.module.css";
import { IProduct } from "../../products/interfaces/IProduct";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { deleteProduct } from "../../products/slices/products-slices";
import { Link } from "react-router-dom";
import EditIconComponent from "../icons/EditIconComponent";
import ViewIconComponent from "../icons/ViewIconComponent";
// import ModalEditProduct from "../ModalProduct/ModalEditProduct";
import { IOrder } from "../../orders/interfaces/IOrder";
import ModalEditProduct from "../ModalProduct/ModalEditProduct";
import ModalEditOrder from "../ModalOrder/ModalViewOrder";
import ModalViewOrder from "../ModalOrder/ModalViewOrder";

type Props = {
  order: IOrder;
  handleDelete(id: string): void;
  // handleEdit(id: string): void;
};

const OrderCard = ({ order, handleDelete }: Props) => {
  // const handleDelete = (id: string) => {
  //   dispatch(deleteProduct(id));
  // };

  // const handleEdit = (id: string): void => {
  //   <ModalEditProduct />;
  // };

  return (
    <div className={styles.orderCard}>
      <div className={styles.orderInfo}>
        <p>
          {order.paymentMethod} - R$ {order.totalPrice}
        </p>
        <p>Quantidade total: {order.paymentMethod}</p>
      </div>

      <div className={styles.orderActions}>
        <DeleteIcon onClick={() => handleDelete(order._id)} />
        <ModalViewOrder iconView={<ViewIconComponent />} order={order} />
        {/* <ModalEditOrder iconEdit={<EditIconComponent />} order={order} /> */}
      </div>
    </div>
  );
};

export default OrderCard;
