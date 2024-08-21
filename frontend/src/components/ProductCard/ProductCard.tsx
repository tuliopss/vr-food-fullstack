import styles from "./ProductCard.module.css";
import { IProduct } from "../../products/interfaces/IProduct";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { deleteProduct } from "../../products/slices/products-slices";
import { Link } from "react-router-dom";

type Props = {
  product: IProduct;
  handleDelete(id: string): void;
};

const ProductCard = ({ product, handleDelete }: Props) => {
  const dispatch: AppDispatch = useDispatch();

  // const handleDelete = (id: string) => {
  //   dispatch(deleteProduct(id));
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

        <EditIcon />
      </div>
    </div>
  );
};

export default ProductCard;
