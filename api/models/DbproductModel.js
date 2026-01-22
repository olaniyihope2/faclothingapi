// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "DbCategory",
  
//     },

//     description: {
//       type: String,
//     },

//     images: [String], // Array of image URLs from S3

//     price: {
//       type: Number,

//     },

//     discountPrice: {
//       type: Number,
//     },



//     // 👕 Clothing-specific fields
//     color: {
//       type: [String], // multiple colors e.g. ["red", "blue"]
//     },

  
// sizes: [
//   {
//     label: {
//       type: String,
//       enum: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//   },
// ],

//     material: {
//       type: String, // e.g., Cotton, Polyester, Blend
//     },

//     type: {
//       type: String, // e.g., T-Shirt, Hoodie, Cap, Jacket
//     },

//     tag: {
//       type: [String], // e.g., ["summer", "unisex", "sports"]
//     },

// decorationMethods: [
//   {
//     name: {
//       type: String,
//       enum: ["Printed", "Embroidered", "Debossed"],
    
//     },
//     note: {
//       type: String, // e.g. "No Minimum"
//     },
//   },
// ],

// weight: {
//   type: Number, // weight in KG
//   min: 0,
// },

//     minimumQuantity: {
//       type: Number, // Minimum order quantity
//       default: 1,
//     },

// brand: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "DbBrand",   // ✅ must match the model name
//   },

//     features: {
//       type: [String], // e.g., ["Waterproof", "Breathable", "Eco-friendly"]
//     },

//     closureType: {
//       type: String,
//       enum: ["No Closure", "Zipper", "Buttons", "Hooks", "Velcro"],
//     },

//     reviews: [
//       {
//         user: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "DbUser",
//         },
//         rating: {
//           type: Number,
//           min: 1,
//           max: 5,
//         },
//         comment: String,
//         date: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],
//     isBestSeller: { type: Boolean, default: false },
//     isTrending: { type: Boolean, default: false },
//     isFeatured: { type: Boolean, default: false },
//     isSpecial: { type: Boolean, default: false },

//     productDate: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("DbProduct", productSchema);
import mongoose from "mongoose";
import slugify from "slugify"; // npm install slugify

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true, // ensures no two products have the same slug
      lowercase: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DbCategory",
    },

    description: String,
    images: [String],
    price: Number,
    discountPrice: Number,
    color: [String],
    sizes: [
      {
        label: {
          type: String,
          enum: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    material: String,
    type: String,
    tag: [String],
    decorationMethods: [
      {
        name: { type: String, enum: ["Printed", "Embroidered", "Debossed"] },
        note: String,
      },
    ],
    weight: { type: Number, min: 0 },
    minimumQuantity: { type: Number, default: 1 },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "DbBrand" },
    features: [String],
    closureType: {
      type: String,
      enum: ["No Closure", "Zipper", "Buttons", "Hooks", "Velcro"],
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "DbUser" },
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        date: { type: Date, default: Date.now },
      },
    ],
    isBestSeller: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isSpecial: { type: Boolean, default: false },
    productDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ✅ Auto-generate slug from name before saving
productSchema.pre("save", function (next) {
  if (this.isModified("name") || !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model("DbProduct", productSchema);
