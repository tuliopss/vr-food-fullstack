import styles from "./ProductCard.module.css";
import { IProduct } from "../../products/interfaces/IProduct";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
type Props = {
  product: IProduct;
};

const ProductCard = (props: Props) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.productInfo}>
        <p>
          {props.product.title} - R$ {props.product.price}
        </p>
        <p>Quantidade total: {props.product.quantity}</p>
      </div>

      <div className={styles.productActions}>
        <DeleteIcon />
        <EditIcon />
      </div>
    </div>
  );
};

export default ProductCard;
