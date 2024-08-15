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
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],

    orderTime: { type: Date, default: Date.now }, // Tempo do pedido
  },
  { timestamps: true, collection: 'orders' },
);
