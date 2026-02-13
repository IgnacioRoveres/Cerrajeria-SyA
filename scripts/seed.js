const mongoose = require("mongoose");
const path = require("path");

// INTENTAMOS CARGAR .env.local (La configuración de Next.js)
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

// POR LAS DUDAS, CARGAMOS TAMBIÉN .env (Si existe)
require("dotenv").config(); 

const MONGODB_URI = process.env.MONGODB_URI;
// Esquema Simple del Producto (Copiado de tu modelo)
const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // "Automotor", "Cerrajería", "Accesorios"
  images: [{ type: String }],
  stock: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

// DATOS PROCESADOS DEL EXCEL (35 Productos)
const products = [
  {
    title: "Aceite Total Sintético 5w30",
    price: 95200,
    category: "Automotor",
    stock: 2,
    description: "Aceite sintético 5w30 de alta performance.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Aceite Total Sintético 0w30",
    price: 106500,
    category: "Automotor",
    stock: 1,
    description: "Aceite sintético 0w30 para motores modernos.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Aceite Total Sintético 5w40",
    price: 86000,
    category: "Automotor",
    stock: 3,
    description: "Aceite sintético 5w40.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Aceite Total Semisintético",
    price: 35000,
    category: "Automotor",
    stock: 28,
    description: "Aceite semisintético estándar.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Aceite Motorcraft Semisintético",
    price: 30000,
    category: "Automotor",
    stock: 4,
    description: "Aceite semisintético original Motorcraft.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Filtro Aceite Fram PH 5796 (Renault)",
    price: 4950,
    category: "Automotor",
    stock: 12,
    description: "Filtro de aceite para línea Renault.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Filtro Aceite Fram PH 5548 A (VW)",
    price: 5850,
    category: "Automotor",
    stock: 12,
    description: "Filtro de aceite para línea Volkswagen.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Filtro Aceite Fram PH 5949 (Fiat)",
    price: 4100,
    category: "Automotor",
    stock: 12,
    description: "Filtro de aceite para línea Fiat.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Filtro Aceite Fram PH 4701 (Chevrolet)",
    price: 3450,
    category: "Automotor",
    stock: 12,
    description: "Filtro de aceite para línea Chevrolet.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Filtro Aire Fram CA 5496 (Chevrolet)",
    price: 3450,
    category: "Automotor",
    stock: 12,
    description: "Filtro de aire para Chevrolet.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Filtro Aire Fram CA 5627 (Fiat)",
    price: 4100,
    category: "Automotor",
    stock: 12,
    description: "Filtro de aire para Fiat.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Filtro Aire Fram CA 9410 (VW)",
    price: 5850,
    category: "Automotor",
    stock: 12,
    description: "Filtro de aire para Volkswagen.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Filtro Aire Fram CA 8964 (Renault)",
    price: 4950,
    category: "Automotor",
    stock: 12,
    description: "Filtro de aire para Renault.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Cerradura Sekur 400 (Frente Chico)",
    price: 34500,
    category: "Cerrajería",
    stock: 10,
    description: "Cerradura de 4 combinaciones con frente chico.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Cerradura Sekur 401",
    price: 34500,
    category: "Cerrajería",
    stock: 10,
    description: "Cerradura de 4 combinaciones estándar.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Cerradura Sekur 410",
    price: 35500,
    category: "Cerrajería",
    stock: 10,
    description: "Cerradura de 4 combinaciones reforzada.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Cerradura Sekur 415 Doble Perno",
    price: 36500,
    category: "Cerrajería",
    stock: 10,
    description: "Cerradura doble perno de 4 combinaciones.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Cerradura Sekur 600 Doble Perno",
    price: 42500,
    category: "Cerrajería",
    stock: 10,
    description: "Cerradura doble perno de 6 combinaciones (Alta Seguridad).",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Cerradura Sekur 620 Doble Perno",
    price: 32500,
    category: "Cerrajería",
    stock: 10,
    description: "Cerradura doble perno de 6 combinaciones.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Manijón Bronzen Acero Inoxidable",
    price: 18500,
    category: "Cerrajería",
    stock: 3,
    description: "Manijón con bocallave universal.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Manija Bronzen Doble Balancín",
    price: 16500,
    category: "Cerrajería",
    stock: 6,
    description: "Para puerta de aluminio (Blanco/Negro).",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Cerrojo Antipánico Everlock",
    price: 49000,
    category: "Cerrajería",
    stock: 1,
    description: "Sistema antipánico con llave computada.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Cilindro Puerta Ford Ka/Fiesta (Juego)",
    price: 69000,
    category: "Automotor",
    stock: 2,
    description: "Juego de cilindros puerta Der/Izq Llave Tibbe.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Cilindro Puerta Berlingo/Partner (Juego)",
    price: 90000,
    category: "Automotor",
    stock: 2,
    description: "Juego de cilindros para puerta.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Cilindro Contacto Renault Duster/Logan",
    price: 65000,
    category: "Automotor",
    stock: 2,
    description: "Para modelos 2014 en adelante.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Cilindro Contacto Chevrolet Corsa/Meriva",
    price: 59000,
    category: "Automotor",
    stock: 2,
    description: "Cilindro mano derecha.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Cilindro Contacto VW Gol",
    price: 55000,
    category: "Automotor",
    stock: 2,
    description: "Cilindro de arranque para VW Gol.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Botón Baúl Corsa Classic (94-2004)",
    price: 47500,
    category: "Automotor",
    stock: 1,
    description: "Incluye 2 llaves.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Botón Baúl Corsa/Meriva",
    price: 87500,
    category: "Automotor",
    stock: 1,
    description: "Incluye 2 llaves.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Botón Apertura Baúl Clio II",
    price: 75200,
    category: "Automotor",
    stock: 2,
    description: "Incluye 2 llaves.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Botón Apertura Baúl Suran/Fox",
    price: 85500,
    category: "Automotor",
    stock: 2,
    description: "Con cierre automático y 2 llaves.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Cerradura Puerta Delantera Clio II",
    price: 61000,
    category: "Automotor",
    stock: 2,
    description: "Disponible Izquierda/Derecha.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Alarma KUBE KB AL 829",
    price: 79000,
    category: "Automotor",
    stock: 4,
    description: "Alarma para auto modelo KUBE KB AL 829.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Cilindro Contacto Antirrobo Peugeot 206",
    price: 90000,
    category: "Automotor",
    stock: 1,
    description: "Cilindro de seguridad línea Linares.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  },
  {
    title: "Collar Ignición Ford Ecosport",
    price: 98000,
    category: "Automotor",
    stock: 1,
    description: "Repuesto Universal.",
    images: ["https://placehold.co/600x400/1a1a1a/crimson?text=Sin+Imagen"],
  }
];

async function seed() {
  try {
    console.log("🔌 Conectando a MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Conectado.");

    console.log("🧹 Limpiando productos viejos (opcional)...");
    // Si querés borrar lo anterior descomentá esta línea:
    await Product.deleteMany({});

    console.log(`📦 Insertando ${products.length} productos...`);
    await Product.insertMany(products);

    console.log("🚀 ¡Éxito! Productos cargados.");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

seed();