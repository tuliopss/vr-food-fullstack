import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormEvent, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../products/slices/products-slices";
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

export default function ModalAddProduct() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch: AppDispatch = useDispatch();

  const initialProduct: IProduct = {
    title: "",
    quantity: 1,
    price: 0,
  };
  //   const { products } = useSelector((state: RootState) => state.product);

  const [product, setProduct] = useState<IProduct>(initialProduct);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const parseValue =
      name === "price" || name === "quantity" ? parseFloat(value) : value;

    setProduct({
      ...product,
      [name]: parseValue,
    });
    console.log(product);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const newProduct = await dispatch(createProduct(product));

    if (newProduct) {
      handleClose();
    }
    e.preventDefault();
  };

  return (
    <div>
      <button onClick={handleOpen}>Cadastrar novo item</button>
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
                onChange={handleChange}
                required
                // value={title || ""}
              />
            </label>

            <label>
              <span>Quantidade total: </span>
              <input
                type='number'
                min={1}
                name='quantity'
                defaultValue={initialProduct.quantity}
                onChange={handleChange}
              />
            </label>

            <label>
              <span>Preço: </span>
              <input
                type='number'
                defaultValue={0}
                name='price'
                onChange={handleChange}
                required
              />
            </label>

            <button type='submit'>Cadastrar</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
