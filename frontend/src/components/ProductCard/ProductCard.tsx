import styles from "./ProductCard.module.css";
import { IProduct } from "../../products/interfaces/IProduct";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { deleteProduct } from "../../products/slices/products-slices";
import { Link } from "react-router-dom";
import EditIconComponent from "../icons/EditIconComponent";
import ModalEditProduct from "../ModalProduct/ModalEditProduct";

type Props = {
  product: IProduct;
  handleDelete(id: string): void;
  // handleEdit(id: string): void;
};

const ProductCard = ({ product, handleDelete }: Props) => {
  // const handleDelete = (id: string) => {
  //   dispatch(deleteProduct(id));
  // };

  // const handleEdit = (id: string): void => {
  //   <ModalEditProduct />;
  // };

  return (
    <div className={styles.productCard}>
      <div className={styles.productInfo}>
        <p>
          {product.title} - R$ {product.price}
        </p>
        <p>Quantidade total: {product.quantity}</p>
      </div>

      <div className={styles.productActions}>
        <DeleteIcon onClick={() => handleDelete(product._id)} />

        <ModalEditProduct iconEdit={<EditIconComponent />} product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
