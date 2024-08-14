// import * as mongoose from 'mongoose';

// export const OrderSchema = new mongoose.Schema(
//   {
//     products: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         quantity: { type: Number },
//       },
//     ],
//     // quantity: [{ type: Number }],
//     orderTime: { type: Date },
//   },
//   { timestamps: true, collection: 'orders' },
// );
import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    orderProducts: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Referência ao Product
        quantity: { type: Number, required: true }, // Quantidade do produto
      },
    ],
    orderTime: { type: Date, default: Date.now }, // Tempo do pedido
  },
  { timestamps: true, collection: 'orders' },
);
