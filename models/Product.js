import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "La categoría es obligatoria"],
      enum: ["Automotor", "Residencial", "Accesorios", "Cerrajería"], 
    },
    image: {
      type: String,
      default: "/images/placeholder.jpg",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// EL TRUCO ESTÁ ACÁ ABAJO 👇
// Si el modelo ya existe, usalo. Si no, crealo.
// Esto evita que Next.js intente crearlo dos veces y rompa todo.
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);