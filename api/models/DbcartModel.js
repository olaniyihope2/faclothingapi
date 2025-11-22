// // models/Cart.js
// import mongoose from "mongoose";

// const cartSchema = new mongoose.Schema({
//   cartId: { type: String, required: true }, // unique per user/visitor
//   items: [
//     {
//       product: { type: mongoose.Schema.Types.ObjectId, ref: "DbProduct" },
//       quantity: { type: Number, default: 1 },
//     },
//   ],
// }, { timestamps: true });

// export default mongoose.model("DbCart", cartSchema);
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  cartId: { type: String, required: true, unique: true },
  items: [
    {
      product: {
        type: Object, // store the full product object
        required: true,
      },
      quantity: { type: Number, default: 1 },
      color: { type: String },
    },
  ],
}, { timestamps: true });

export default mongoose.model("DbCart", cartSchema);
