import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormEvent, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  editProduct,
} from "../../products/slices/products-slices";
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
  iconEdit: React.ReactNode;
  product: IProduct;
};

export default function ModalEditProduct({ iconEdit, product }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch: AppDispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  //   const { products } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setQuantity(product.quantity);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const productData = {
      _id: product._id,
      title: title,
      quantity: quantity,
      price: price,
    };

    dispatch(editProduct(productData));
    console.log(productData);
    handleClose();
  };

  return (
    <div>
      <div onClick={handleOpen} style={{ cursor: "pointer" }}>
        {iconEdit}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Insira as informações
          </Typography>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Nome do item: </span>
              <input
                type='text'
                placeholder='Ex: Salgado de calabresa'
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}

                // value={title || ""}
              />
            </label>

            <label>
              <span>Quantidade total: </span>
              <input
                type='number'
                min={1}
                name='quantity'
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </label>

            <label>
              <span>Preço: </span>
              <input
                type='number'
                name='price'
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </label>

            <button type='submit'>Editar</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
